import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly TasksService: TasksService) { }
  @Get()
  public async findAll(): Promise<Task[]> {
    return await this.TasksService.findAll();
  }
  @Get('/:id')
  public async findOne(@Param('id') params: FindOneParams): Promise<Task> {
    return await this.findOneOrFail(params.id);
  }
  @Post()
  public async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.TasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  public async updateTask(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneOrFail(params.id);
    try {
      return await this.TasksService.updateTask(task, updateTaskDto);
    } catch (e) {
      if (e instanceof WrongTaskStatusException) {
        throw new BadRequestException([e.message]);
      }
      throw e;
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTask(@Param() params: FindOneParams): Promise<void> {
    const task = await this.findOneOrFail(params.id);
    await this.TasksService.deleteTask(task);
  }
  private async findOneOrFail(id: string): Promise<Task> {
    const task = await this.TasksService.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
}
