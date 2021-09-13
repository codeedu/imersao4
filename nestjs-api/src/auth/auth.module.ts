import { Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  providers: [JwtStrategyService]
})
export class AuthModule {}
