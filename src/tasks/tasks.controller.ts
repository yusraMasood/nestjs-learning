import {
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
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskStatusDto } from './update-task-status.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly TasksService: TasksService) { }
  @Get()
  public findAll(): ITask[] {
    return this.TasksService.findAll();
  }
  @Get('/:id')
  public findOne(@Param('id') params: FindOneParams): ITask {
    return this.findOneOrFail(params.id)
  }
  @Post()
  public create(@Body() createTaskDto: CreateTaskDto) {
    return this.TasksService.create(createTaskDto);
  }

  // @Patch('/:id/status')
  // public updateTaskStatus(
  //   @Param() params: FindOneParams,
  //   @Body() body: UpdateTaskStatusDto
  // ): ITask {
  //   const task = this.findOneOrFail(params.id)
  //   task.status = body.status
  //   return task
  // }
  @Patch('/:id')
  public updateTask(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskDto
  ): ITask {
    const task = this.findOneOrFail(params.id)
    this.TasksService.updateTask(task, updateTaskDto)
    return task
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param() params: FindOneParams): void {
    const task = this.findOneOrFail(params.id)
    this.TasksService.deleteTask(task)
  }
  private findOneOrFail(id: string): ITask {
    const task = this.TasksService.findOne(id);
    if (!task) throw new NotFoundException();
    return task

  }
}
