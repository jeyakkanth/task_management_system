package com.example.task_management_system.service;

import com.example.task_management_system.dto.requestDto.UserRequestDto;
import com.example.task_management_system.dto.responseDto.UserActiveWorkloadDto;
import com.example.task_management_system.dto.responseDto.UserResponseDto;

import java.util.List;

public interface UserService {
    boolean createUser(UserRequestDto requestDto);

    List<UserActiveWorkloadDto> getUserActiveWorkload();

    List<UserResponseDto> getAllUser();
}