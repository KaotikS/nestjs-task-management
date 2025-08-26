import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }
  
  // @Get()
  // getTasks(
  //   @Query() getTasksFilterDto: GetTasksFilterDto
  // ): Task[] {
  //   if (Object.keys(getTasksFilterDto).length) {
  //     return this.tasksService.getTasksWithFilters(getTasksFilterDto)
  //   }
  //   return this.tasksService.getAllTasks()
  // }

  // @Post()
  // createTask(
  //   @Body() createTaskDto: CreateTaskDto
  // ): Task {
  //   return this.tasksService.createTask(createTaskDto)
  // }

  // @Delete('/:id')
  // deleteTask(
  //   @Param('id') id: string
  // ): void {
  //   return this.tasksService.deleteTask(id)
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDto
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, updateTaskDto)
  // }
}
