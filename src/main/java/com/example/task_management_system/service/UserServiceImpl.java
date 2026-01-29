package com.example.task_management_system.service;

import com.example.task_management_system.dto.requestDto.UserRequestDto;
import com.example.task_management_system.dto.responseDto.UserActiveWorkloadDto;
import com.example.task_management_system.dto.responseDto.UserResponseDto;
import com.example.task_management_system.entity.User;
import com.example.task_management_system.excerptionHandler.HandleInvalid;
import com.example.task_management_system.mapper.UserMapper;
import com.example.task_management_system.repository.TaskRepository;
import com.example.task_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final TaskRepository taskRepository;


    @Override
    public boolean createUser(UserRequestDto requestDto) {

        boolean emailExists = userRepository.existsByEmail(requestDto.getEmail());
        if(emailExists){
            throw new HandleInvalid("Email Already Exists...!");
        }

        User user = userMapper.toEntity(requestDto);
        user.setActive(true);
        userRepository.save(user);

        return true;
    }

    @Override
    public List<UserActiveWorkloadDto> getUserActiveWorkload() {

        return  taskRepository.getUserActiveWorkload();
    }

    @Override
    public List<UserResponseDto> getAllUser() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
    }
}
