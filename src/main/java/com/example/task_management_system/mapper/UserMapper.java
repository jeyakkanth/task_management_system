package com.example.task_management_system.mapper;

import com.example.task_management_system.dto.requestDto.UserRequestDto;
import com.example.task_management_system.dto.responseDto.UserResponseDto;
import com.example.task_management_system.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity (UserRequestDto requestDto);
    UserResponseDto toDto (User user);
}
