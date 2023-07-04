import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  task_name: string;

  @IsString()
  @IsOptional()
  task_description: string;
}
