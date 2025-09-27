# Functional Documentation - Task Management System Frontend

## Introduction
This document describes the main functionalities and user flows of the Task Management System frontend, built with React and TypeScript.

## Functional Requirements
- User registration and login
- Task creation, editing, and deletion
- Task status management (To Do, In Progress, Done)
- Kanban-style dashboard for task visualization
- Responsive design for desktop and mobile

## User Roles & Permissions
- **Registered User**: Can create, edit, delete, and view their own tasks
- **Guest**: Can only view the login and registration pages

## Main Features & Flows
### 1. Authentication
- Users can register with email and password
- Users can log in and log out
- Authenticated users access the dashboard

### 2. Task Management
- Create new tasks with title, description, and status
- Edit or delete existing tasks
- Change task status by dragging or selecting

### 3. Dashboard
- Tasks are displayed in columns by status
- Each task is shown as a card with details
- Users can move tasks between columns

## UI Components Overview
- **LoginPage**: User login form
- **RegisterPage**: User registration form
- **Dashboard**: Main task board
- **TaskColumn**: Column for each status
- **TaskCard**: Individual task display
- **CreateTaskModal**: Modal for adding/editing tasks
- **Nav**: Navigation bar

## API Integration
- Uses Axios for API calls to backend endpoints
- Handles authentication, task CRUD operations

## Error Handling & Validation
- Form validation for login/register/task forms
- User-friendly error messages

---
For technical details, refer to the codebase and README.md.
