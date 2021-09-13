import { Test, TestingModule } from '@nestjs/testing';
import { RequestReportGenerateService } from './request-report-generate.service';

describe('RequestReportGenerateService', () => {
  let service: RequestReportGenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestReportGenerateService],
    }).compile();

    service = module.get<RequestReportGenerateService>(RequestReportGenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
