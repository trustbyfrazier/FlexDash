import { SetMetadata } from '@nestjs/common';

// This sets a metadata key 'isPublic' = true on the route
export const Public = () => SetMetadata('isPublic', true);

