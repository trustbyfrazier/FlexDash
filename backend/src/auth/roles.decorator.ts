import { SetMetadata } from '@nestjs/common';

// Roles decorator to attach required roles to route handlers
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

