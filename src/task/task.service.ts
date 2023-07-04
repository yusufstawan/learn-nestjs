import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    const createData = await this.prisma.tasks.create({
      data: data,
    });
    return {
      statusCode: 200,
      data: createData,
    };
  }

  async getAllTask() {
    const dataTask = await this.prisma.tasks.findMany();
    return {
      statusCode: 200,
      data: dataTask,
    };
  }

  async getTaskById(id: number) {
    const dataTask = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    return {
      statusCode: 200,
      data: dataTask,
    };
  }

  async updateTaskById(id: number, data: UpdateTaskDto) {
    const updateTask = await this.prisma.tasks.update({
      where: {
        id: id,
      },
      data: data,
    });
    return {
      statusCode: 200,
      data: updateTask,
    };
  }

  async deleteTaskById(id: number) {
    const deleteTask = await this.prisma.tasks.delete({
      where: {
        id: id,
      },
    });
    return {
      statusCode: 200,
      data: deleteTask,
      message: 'Sukses menghapus data',
    };
  }
}
