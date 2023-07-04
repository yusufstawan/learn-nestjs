import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task_name: string;

  @IsString()
  @IsNotEmpty()
  task_description: string;
}
