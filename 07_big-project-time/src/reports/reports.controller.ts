import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { ApproveRequestDto } from './dtos/approve-request.dto';
import { CreateReportDto } from './dtos/create-report-dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveRequest(@Param('id') id: number, @Body() body: ApproveRequestDto) {
    return this.reportService.approveRequest(id, body.approved);
  }
}
