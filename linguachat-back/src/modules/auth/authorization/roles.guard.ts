import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';
import { UserGetDto } from 'src/models/user.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(executionContext: ExecutionContext): boolean {
    const allowed = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      executionContext.getHandler(),
      executionContext.getClass(),
    ]);

    if (!allowed || allowed.length === 0) return true;

    const request = executionContext.switchToHttp().getRequest();
    const user: UserGetDto | undefined = request.user as UserGetDto | undefined;
    if (!user) return false;

    const userRole: Role = user?.role as Role;
    if (!userRole) return false;

    return allowed.includes(userRole);
  }
}
