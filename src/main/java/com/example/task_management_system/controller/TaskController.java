package com.example.task_management_system.controller;

import com.example.task_management_system.Enums.Status;
import com.example.task_management_system.dto.requestDto.StatusRequestDto;
import com.example.task_management_system.dto.requestDto.TaskRequestDto;
import com.example.task_management_system.dto.responseDto.TaskResponseDto;
import com.example.task_management_system.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    //create new task
    @PostMapping("/create")
    public ResponseEntity<String> createNewTask(@RequestBody TaskRequestDto requestDto){
        boolean created = taskService.createTask(requestDto);

        if (created){
            return ResponseEntity.ok("Task Created Successfully...!");
        }else{
            return ResponseEntity.badRequest().body("Task Failed to create...!");
        }
    }

    //assign task to user
    @PutMapping("/{taskId}/assign/{userId}")
    public ResponseEntity<String> assignTask(@PathVariable Long taskId , @PathVariable Long userId){
        boolean updated = taskService.assignTask(taskId , userId);

        if (updated){
            return ResponseEntity.ok("Task Assign Successfully..!");
        }else{
            return ResponseEntity.badRequest().body("Task Not Assign..!");
        }
    }

    //update task status
    @PutMapping("/{taskId}")
    public ResponseEntity<String> updateStatus(@PathVariable Long taskId , @RequestBody StatusRequestDto status){
        boolean updated = taskService.updateTaskStatus(taskId , status);

        if (updated){
            return ResponseEntity.ok("Task Status Successfully updated..!");
        }else{
            return ResponseEntity.badRequest().body("Failed to Update Task status..!");
        }
    }

    //get all Not Completed Task
    @GetMapping("/overdue-tasks")
    public ResponseEntity<List<TaskResponseDto>>getAllTask(@RequestParam Status status){
        List<TaskResponseDto> taskResponseDtos = taskService.getAllTask(status);

        return ResponseEntity.ok(taskResponseDtos);
    }

    //get all task details
    @GetMapping("/getAllTask")
    public ResponseEntity<List<TaskResponseDto>>getAllTask(){
        List<TaskResponseDto> tasks = taskService.getAllTaskDetails();

        return ResponseEntity.ok(tasks);
    }
}
