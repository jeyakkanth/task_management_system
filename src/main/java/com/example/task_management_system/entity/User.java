package com.example.task_management_system.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true , nullable = false)
    private String email;

    @Column(nullable = false)
    private Boolean active;

    @OneToMany(mappedBy = "assignedUser")
    private Set<Task> tasks;
}
