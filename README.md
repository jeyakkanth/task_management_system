✅ Task Management System – Full Stack Application
📌 Project Overview

The Task Management System is a full-stack web application developed to manage users, tasks, assignments, and task progress efficiently.
It provides a structured way to create tasks, assign them to users, track status changes, monitor workloads, and identify overdue tasks.

The frontend is built using React.js, while the backend is developed with Spring Boot, following clean architecture principles and RESTful API design.

🎯 Project Objectives

Manage users with active and inactive states

Create and track tasks with priorities and deadlines

Assign tasks to users with proper relationship handling

Enforce valid task status transitions

Generate workload and overdue task reports

Deliver a clean, responsive, and user-friendly UI

🔗 User–Task Relationship

The system follows a one-to-many relationship:

One user can have multiple tasks

Each task is assigned to only one user at a time

Tasks can be created without immediate assignment

Inactive users cannot be assigned tasks

Reassigning a task updates ownership automatically

Assigning a task sets the status to IN_PROGRESS

This relationship ensures data consistency and reflects real-world task management scenarios.

🧩 Core Features
👤 User Management

Create users with name and email

View users with Active / Inactive status

Restrict inactive users from task assignment

📝 Task Management

Create tasks with:

Title

Priority (LOW / MEDIUM / HIGH)

Due date

Prevent past due dates

Default task status set to OPEN

🔄 Task Assignment

Assign or reassign tasks to active users only

Automatically update task status to IN_PROGRESS

Display assigned user clearly in task list

🔁 Task Status Tracking

Update task status via dropdown

Supported statuses:

OPEN

IN_PROGRESS

COMPLETED

Invalid status transitions are restricted at both UI and backend levels

Backend validation messages are displayed in the UI

📊 User Workload Report

Displays the number of active (non-completed) tasks per user

Helps balance workload across users

⏰ Overdue Task Report

Displays tasks whose due date has passed

Highlights overdue tasks visually

Shows task owner and due date for quick review

🖥️ Technology Stack
Frontend

React.js

JavaScript (ES6+)

HTML5 / CSS3

Component-based UI design

Backend

Spring Boot

Java

RESTful APIs

Validation and business logic handling

Database

Relational Database (MySQL / PostgreSQL)

🔌 API Endpoints (Backend)

POST /api/users – Create user

POST /api/tasks – Create task

PUT /api/tasks/{taskId}/assign/{userId} – Assign or reassign task

PUT /api/tasks/{taskId}/status – Update task status

GET /api/user-active-workload – User workload report

GET /api/reports/overdue-tasks – Overdue task report

📂 Project Architecture

Separation of concerns between frontend and backend

REST-based communication

Clear entity relationships

Scalable and maintainable structure
