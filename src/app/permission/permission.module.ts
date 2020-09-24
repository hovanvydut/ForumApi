import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './service/permission.service';
import { PermissionController } from './controller/permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from './repository/permission.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionRepository]),
    forwardRef(() => UserModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
