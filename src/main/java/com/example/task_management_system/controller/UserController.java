package com.example.task_management_system.controller;

import com.example.task_management_system.dto.requestDto.UserRequestDto;
import com.example.task_management_system.dto.responseDto.UserActiveWorkloadDto;
import com.example.task_management_system.dto.responseDto.UserResponseDto;
import com.example.task_management_system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    //create new user
    @PostMapping("/create")
    public ResponseEntity<String> createNewUser(@RequestBody UserRequestDto requestDto){
        boolean created = userService.createUser(requestDto);

        if(created){
            return ResponseEntity.ok("User Created Successfully..!");
        }else {
            return ResponseEntity.badRequest().body("User create Failed..!");
        }
    }

    //user active list
    @GetMapping("/user-active-workload")
    public ResponseEntity<List<UserActiveWorkloadDto>> getAllActiveList(){
        List<UserActiveWorkloadDto> userActiveWorkloadDtos = userService.getUserActiveWorkload();

        return ResponseEntity.ok(userActiveWorkloadDtos);
    }

    //get all users
    @GetMapping("/getAllUser")
    public ResponseEntity<List<UserResponseDto>>getAllUser(){
        List<UserResponseDto> users = userService.getAllUser();

        return ResponseEntity.ok(users);
    }
}
