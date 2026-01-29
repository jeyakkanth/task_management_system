package com.example.task_management_system.dto.responseDto;

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
public class TaskResponseDto {

    private Long id;
    private String title;
    private LocalDate dueDate;
    private Priority priority;
    private Status status;

    // assigned user info
    private Long assignedUserId;
    private String assignedUserName;

}
