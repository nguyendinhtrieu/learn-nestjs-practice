import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { ApproveRequestDto } from './dtos/approve-request.dto';
import { CreateReportDto } from './dtos/create-report-dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  getEstimate(@Query() dto: GetEstimateDto) {
    return this.reportService.createEstimate(dto);
  }

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
