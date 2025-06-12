# Task Management System

## Tech Stack
- Laravel 12 (Backend)
- Next.js (Frontend)
- MySQL
- Docker Compose

## Start the project
```bash
docker-compose -f docker-compose.yml up -d --build
```

## migrate database 
- docker exec -it <BackendContainerName> bash
- run => php artisan serve

Frontend: http://0.0.0.0:3000
Backend API: http://localhost:8080/api/v1/tasks
