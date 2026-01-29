export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'ON_HOLD' | 'DONE';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  assignedUserId?: string;
}
