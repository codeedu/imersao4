import { Report } from './entities/report.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([Report]),
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService
  ],
})
export class ReportsModule {}
