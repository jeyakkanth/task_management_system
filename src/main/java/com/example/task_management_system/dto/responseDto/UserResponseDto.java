package com.example.task_management_system.dto.responseDto;

import com.example.task_management_system.entity.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private Long id;

    private String name;

    private String email;

    private Boolean active;
}
