import { IsISO8601, IsNotEmpty } from 'class-validator';
import { IsAfter } from '../../common/validators/is-after.rule';

export class CreateReportDto {
  @IsISO8601()
  @IsNotEmpty()
  start_date: Date;

  @IsAfter('start_date')
  @IsISO8601()
  @IsNotEmpty()
  end_date: Date;
}
