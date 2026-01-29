package com.example.task_management_system.repository;

import com.example.task_management_system.Enums.Status;
import com.example.task_management_system.dto.requestDto.TaskStatusDateDto;
import com.example.task_management_system.dto.responseDto.TaskResponseDto;
import com.example.task_management_system.dto.responseDto.UserActiveWorkloadDto;
import com.example.task_management_system.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task , Long> {
    boolean existsByTitle(String title);

    @Query("""
        SELECT new com.example.task_management_system.dto.responseDto.UserActiveWorkloadDto(
            u.id,
            u.name,
            COUNT(t)
        )
        FROM User u
        LEFT JOIN Task t
            ON t.assignedUser = u
            AND t.status <> com.example.task_management_system.Enums.Status.DONE
        WHERE u.active = true
        GROUP BY u.id, u.name
    """)
    List<UserActiveWorkloadDto> getUserActiveWorkload();

    List<Task> findByDueDateBeforeAndStatusNot(LocalDate date, Status status);

}
