package com.example.task_management_system.excerptionHandler;

public class HandleInvalid extends RuntimeException {
    public HandleInvalid(String message) {
        super(message);
    }
}
