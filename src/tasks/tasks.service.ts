import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        private tasksRepository: TasksRepository
    ) {}

    async getTaskById(id: string): Promise<Task> {
        return await this.tasksRepository.findOne(id);;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto)
    }

    async deleteTask(id: string): Promise<void> {
        return this.tasksRepository.deleteTask(id);
    }

    async updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksRepository.updateTask(id, updateTaskDto);
    }

    async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(getTasksFilterDto)
    }

    // getTasksWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = getTasksFilterDto;

    //     let tasks = this.getAllTasks()

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }

    //     return tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);

    //     return task;
    // }

    

}
