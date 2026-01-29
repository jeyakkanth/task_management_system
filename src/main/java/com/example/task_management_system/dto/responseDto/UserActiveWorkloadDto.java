package com.example.task_management_system.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserActiveWorkloadDto {

    private Long userId;
    private String userName;
    private long activeTaskCount;
}
