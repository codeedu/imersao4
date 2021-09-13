import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './entities/account.entity';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MyAccountController } from './my-account/my-account.controller';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [AccountsController, MyAccountController],
  providers: [AccountsService],
})
export class AccountsModule {}
