package com.example.task_management_system.dto.requestDto;

import com.example.task_management_system.Enums.Priority;
import com.example.task_management_system.Enums.Status;
import com.example.task_management_system.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {

    private String title;

    private Status status;

    private Priority priority;

    private LocalDate dueDate;

    private User assignedUserId;
}
