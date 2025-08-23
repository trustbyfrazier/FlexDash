// src/users/users.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword, generateRandomPassword } from '../utils/password';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    this.logger.log('Fetching all users...');
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: { select: { name: true } },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createStaff(adminId: string, dto: CreateUserDto) {
    const password = dto.password || generateRandomPassword();
    const passwordHash = await hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName ?? '',
        lastName: dto.lastName ?? '',
        passwordHash,
        role: {
          connect: { name: dto.role }, // ✅ Role.name is unique
        },
      },
      include: { role: true },
    });

    await this.logAction('CREATE_STAFF', user.id, adminId);
    this.logger.log(`Staff created: ${user.email} by admin ${adminId}`);

    return { ...user, password };
  }

  async updateStaff(id: string, dto: UpdateUserDto, adminId: string) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email ?? existing.email,
        firstName: dto.firstName ?? existing.firstName,
        lastName: dto.lastName ?? existing.lastName,
        ...(dto.role && {
          role: { connect: { name: dto.role } },
        }),
      },
      include: { role: true },
    });

    await this.logAction('UPDATE_STAFF', id, adminId);
    this.logger.log(`Staff updated: ${updated.email} by admin ${adminId}`);

    return updated;
  }

  async deleteStaff(adminId: string, id: string) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');

    // 🔹 Log the delete action BEFORE deleting the user
    await this.logAction('DELETE_STAFF', id, adminId);

    // 🔹 Delete all related UserAction rows first to avoid FK violations
    await this.prisma.userAction.deleteMany({ where: { targetUserId: id } });
    await this.prisma.userAction.deleteMany({ where: { performedById: id } });

    // 🔹 Now safely delete the user
    const deleted = await this.prisma.user.delete({
      where: { id },
      include: { role: true },
    });

    this.logger.log(`Staff deleted: ${deleted.email} by admin ${adminId}`);
    return deleted;
  }

  async forcePasswordReset(adminId: string, id: string, newPassword?: string) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');

    const password = newPassword || generateRandomPassword();
    const passwordHash = await hashPassword(password);

    const updated = await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
      include: { role: true },
    });

    await this.logAction('RESET_PASSWORD', id, adminId);
    this.logger.log(`Password reset for: ${updated.email} by admin ${adminId}`);

    return { ...updated, password };
  }

  // ✅ Type-safe logAction: performedById is required
  private async logAction(
    action: string,
    targetUserId: string,
    performedById: string, // must be provided
  ) {
    if (!performedById) {
      throw new Error('logAction: performedById is required');
    }

    await this.prisma.userAction.create({
      data: {
        action,
        timestamp: new Date(),
        targetUser: { connect: { id: targetUserId } },
        performedBy: { connect: { id: performedById } },
      },
    });
  }
}

