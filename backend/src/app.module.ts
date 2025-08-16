import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CrmModule } from './crm/crm.module';
import { OrdersModule } from './orders/orders.module';
import { InventoryModule } from './inventory/inventory.module';
import { InvoicingModule } from './invoicing/invoicing.module';
import { PaymentsModule } from './payments/payments.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { SettingsModule } from './settings/settings.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, DashboardModule, CrmModule, OrdersModule, InventoryModule, InvoicingModule, PaymentsModule, SchedulingModule, TasksModule, ProjectsModule, NotificationsModule, AdminModule, RolesModule, SettingsModule, IntegrationsModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
