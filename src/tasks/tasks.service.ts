import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];
  findAll(): ITask[] {
    return this.tasks;
  }
  findOne(id: string): ITask | undefined {
    return this.tasks.find(task => task.id === id);
  }
  create(createTaskDto: CreateTaskDto): ITask {
    const task: ITask = {
      id: randomUUID(),
      ...createTaskDto
    }
    this.tasks.push(task)
    return task

  }
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Delete a task by ID.
   * @param id The ID of the task to delete
   */
  /*******  da97efbc-de6a-4fe9-9515-8f9d44ba345c  *******/
  deleteTask(task: ITask): void {
    this.tasks = this.tasks.filter(filteredTask => filteredTask.id !== task.id)
  }
  public updateTask(task: ITask, updateTaskDto: UpdateTaskDto): ITask {
    Object.assign(task, updateTaskDto)
    return task

  }
}
