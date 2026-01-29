package com.example.task_management_system.dto.requestDto;

import com.example.task_management_system.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusRequestDto {

    private Status status;
}
