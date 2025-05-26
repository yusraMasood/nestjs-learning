import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private readonly TasksService: TasksService) { }
    @Get()
    public findAll(): ITask[] {
        return this.TasksService.findAll()
    }
    @Get('/:id')
    public findOne(@Param('id') id: string): ITask {
        const task = this.TasksService.findOne(id)
        if (task) return task
        throw new NotFoundException()
    }
}
