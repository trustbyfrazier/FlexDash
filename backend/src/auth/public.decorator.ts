import { SetMetadata } from '@nestjs/common';

// Marks a route as public (skips JWT validation)
export const Public = () => SetMetadata('isPublic', true);

