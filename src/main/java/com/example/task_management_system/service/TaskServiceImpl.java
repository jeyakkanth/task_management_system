package com.example.task_management_system.service;

import com.example.task_management_system.Enums.Status;
import com.example.task_management_system.dto.requestDto.StatusRequestDto;
import com.example.task_management_system.dto.requestDto.TaskRequestDto;
import com.example.task_management_system.dto.responseDto.TaskResponseDto;
import com.example.task_management_system.entity.Task;
import com.example.task_management_system.entity.User;
import com.example.task_management_system.excerptionHandler.HandleInvalid;
import com.example.task_management_system.mapper.TaskMapper;
import com.example.task_management_system.repository.TaskRepository;
import com.example.task_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService{

    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public boolean createTask(TaskRequestDto requestDto) {
        if(requestDto.getTitle().isEmpty() ||
                requestDto.getPriority() == null ||
                requestDto.getDueDate() == null
        ){
            throw new HandleInvalid("Missing Filed..!");
        }

        if(requestDto.getDueDate().isBefore(LocalDate.now())){
            throw new HandleInvalid("Due date must be a future date..!");
        }

        boolean taskAlreadyExists = taskRepository.existsByTitle(requestDto.getTitle());
        if(taskAlreadyExists){
            throw new HandleInvalid("Task Already Exists...!");
        }

        Task task = taskMapper.toEntity(requestDto);
        task.setStatus(Status.OPEN);
        taskRepository.save(task);

        return true;
    }

    @Override
    public boolean assignTask(Long taskId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new HandleInvalid("User Not Found with Id : " + userId));
        Task task = taskRepository.findById(taskId)
                .orElseThrow(()-> new HandleInvalid("Task Not Found..!"));

        if(!user.getActive()){
            throw new HandleInvalid("user not Active..!");
        }

        task.setAssignedUser(user);

        if(task.getStatus().equals(Status.OPEN)){
            task.setStatus(Status.IN_PROGRESS);
        }

        taskRepository.save(task);
        return true;
    }

    @Override
    public boolean updateTaskStatus(Long taskId , StatusRequestDto status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new HandleInvalid("Task not Found with id : " + taskId));

        User assignUser = task.getAssignedUser();

        if (assignUser == null) {
            throw new HandleInvalid("Assigned user is inactive");
        }

        if(task.getStatus().equals(Status.OPEN)){
            if (status.getStatus() == Status.DONE){
                throw new HandleInvalid("transition is Not Allowed..!");
            }else if (status.getStatus() == Status.IN_PROGRESS){
                task.setStatus(Status.IN_PROGRESS);
            }
        }else if (task.getStatus().equals(Status.IN_PROGRESS)){
            if (status.getStatus() == Status.DONE){
                task.setStatus(Status.DONE);
            } else if (status.getStatus() == Status.ON_HOLD) {
                task.setStatus(Status.ON_HOLD);
            }
        } else if (task.getStatus().equals(Status.ON_HOLD)) {
            if(status.getStatus() ==  Status.IN_PROGRESS ){
                task.setStatus(Status.IN_PROGRESS);
            } else if (status.getStatus() == Status.DONE) {
                throw new HandleInvalid("transition is Not Allowed..!");
            }
        }

        taskRepository.save(task);
        return true;
    }

    @Override
    public List<TaskResponseDto> getAllTask(Status status) {
        LocalDate today = LocalDate.now();

        return taskRepository
                .findByDueDateBeforeAndStatusNot(today, status)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @Override
    public List<TaskResponseDto> getAllTaskDetails() {
        return taskRepository.findAll()
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

}
