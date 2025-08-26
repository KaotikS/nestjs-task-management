import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v7 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { time } from 'console';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        // try to get task
        const found = this.tasks.find(task => task.id === id)!

        // if no task, return error
        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        // if task, return it
        return found;
        
    }

    getTasksWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
        const { status, search } = getTasksFilterDto;

        let tasks = this.getAllTasks()

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string): void {
        const taskToDelete = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
    }

    updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Task {
        let task = this.getTaskById(id)
        const indexOfTask = this.tasks.indexOf(task);
        const {status} = updateTaskDto;
        task = {
            ...task,
            status: status ? status : task.status,
        };
        this.tasks[indexOfTask] = task;
        return task;
    }
}
