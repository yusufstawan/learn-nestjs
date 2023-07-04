import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  @Get()
  async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @Get('/:task_id')
  async getTaskById(@Param('task_id') task_id) {
    return await this.taskService.getTaskById(+task_id);
  }

  @Patch('/:task_id')
  async updateTaskById(@Param('task_id') task_id, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTaskById(+task_id, body);
  }

  @Delete('/:task_id')
  async deleteTaskById(@Param('task_id') task_id) {
    return await this.taskService.deleteTaskById(+task_id);
  }
}
