// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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

  const email = 'admin@demo.com';
  const name = 'Demo Admin';
  const plain = 'admin123';
  const passwordHash = await bcrypt.hash(plain, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      passwordHash,
      roleId: adminRole.id,
      isFirstLogin: false, // admin already "set"
    },
  });

  // eslint-disable-next-line no-console
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

