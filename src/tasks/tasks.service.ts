import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({
            where: {
                id
            }
        });

        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        return found;
    }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

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

    // deleteTask(id: string): void {
    //     const taskToDelete = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
    // }

    // updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Task {
    //     let task = this.getTaskById(id)
    //     const indexOfTask = this.tasks.indexOf(task);
    //     const {status} = updateTaskDto;
    //     task = {
    //         ...task,
    //         status: status ? status : task.status,
    //     };
    //     this.tasks[indexOfTask] = task;
    //     return task;
    // }
}
