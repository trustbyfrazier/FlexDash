// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Upsert roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  await prisma.role.upsert({
    where: { name: 'STAFF' },
    update: {},
    create: { name: 'STAFF' },
  });

  // Admin user credentials
  const email = 'admin@demo.com';
  const firstName = 'Demo';
  const lastName = 'Admin';
  const plainPassword = 'admin123';
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  // Upsert admin user
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      firstName,
      lastName,
      email,
      passwordHash,
      roleId: adminRole.id,
      isFirstLogin: false, // admin already "set"
      isActive: true,
    },
  });

  console.log('✅ Seed complete: admin@demo.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
