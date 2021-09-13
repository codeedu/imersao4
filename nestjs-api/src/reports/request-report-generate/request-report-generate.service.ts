import { InjectModel } from '@nestjs/sequelize';
import { Report } from './../entities/report.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class RequestReportGenerateService {
  constructor(
    @InjectModel(Report)
    private reportModel: typeof Report,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {
    this.reportModel.afterCreate((instance, options) => {
      this.afterCreate(instance);
    });
  }

  async afterCreate(instance: Report) {
    await this.kafkaProducer.send({
      topic: 'reports-create',
      messages: [
        {
          key: 'reports',
          value: JSON.stringify({
            id: instance.id,
            start_date: instance.start_date,
            end_date: instance.end_date,
            account_id: instance.account_id,
          }),
        },
      ],
    });
  }
}
