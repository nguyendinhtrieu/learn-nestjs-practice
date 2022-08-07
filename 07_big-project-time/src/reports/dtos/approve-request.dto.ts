import { IsBoolean } from 'class-validator';

export class ApproveRequestDto {
  @IsBoolean()
  approved: boolean;
}
