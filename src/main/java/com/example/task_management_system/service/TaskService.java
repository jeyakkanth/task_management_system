package com.example.task_management_system.service;

import com.example.task_management_system.Enums.Status;
import com.example.task_management_system.dto.requestDto.StatusRequestDto;
import com.example.task_management_system.dto.requestDto.TaskRequestDto;
import com.example.task_management_system.dto.requestDto.TaskStatusDateDto;
import com.example.task_management_system.dto.responseDto.TaskResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {
    boolean createTask(TaskRequestDto requestDto);

    boolean assignTask(Long taskId, Long userId);

    boolean updateTaskStatus(Long taskId , StatusRequestDto status);

    List<TaskResponseDto> getAllTask(Status status);

    List<TaskResponseDto> getAllTaskDetails();
}
