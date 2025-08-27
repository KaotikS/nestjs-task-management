import { FindOneOptions, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";
import { NotFoundError } from "rxjs";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksRepository {

    constructor(
        @InjectRepository(Task) // La clave: inyectamos el repositorio estándar
        private readonly repository: Repository<Task>,
    ) {}

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = this.repository.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.repository.save(task);
        return task;
    }
    public async deleteTask(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID '${id}' not found`)
        }
    }

    public async findOne(id: string): Promise<Task> {
        const found = await this.repository.findOne({
            where: {
                id
            }
        });
        if (!found) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }
        return found;
    }

    public async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const result = await this.repository.update(id, updateTaskDto);
        return await this.findOne(id);
    }

    public async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.repository.find()
    }
}