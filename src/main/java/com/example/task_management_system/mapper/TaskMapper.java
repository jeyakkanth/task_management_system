package com.example.task_management_system.mapper;

import com.example.task_management_system.Enums.Status;
import com.example.task_management_system.dto.requestDto.TaskRequestDto;
import com.example.task_management_system.dto.responseDto.TaskResponseDto;
import com.example.task_management_system.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDate;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    Task toEntity (TaskRequestDto requestDto);

    @Mapping(source = "assignedUser.id", target = "assignedUserId")
    @Mapping(source = "assignedUser.name", target = "assignedUserName")
    TaskResponseDto toDto(Task task);
}
