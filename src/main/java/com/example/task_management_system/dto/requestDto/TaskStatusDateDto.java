package com.example.task_management_system.dto.requestDto;

import com.example.task_management_system.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatusDateDto {

    private LocalDate date;
    private Status status;
}
