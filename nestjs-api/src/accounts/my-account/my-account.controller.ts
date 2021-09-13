import { TenantService } from './../../tenant/tenant/tenant.service';
import { TenantGuard } from './../../tenant/tenant.guard';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('my-account')
export class MyAccountController {
  constructor(private tenantService: TenantService) {}
  @Get()
  find() {
    return this.tenantService.tenant;
  }
}
