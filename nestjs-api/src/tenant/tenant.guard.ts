import { TenantService } from './tenant/tenant.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); //Express
    const subdomain = request.user.subdomain;
    await this.tenantService.setTenantBy(subdomain);
    return true;
  }
}
