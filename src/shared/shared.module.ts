import { Module } from '@nestjs/common';
import { MyConfigService } from './service/my-config.service';
import { BcryptService } from './service/bcrypt.service';
import { HelperService } from './service/helper.service';

const services = [MyConfigService, BcryptService, HelperService];

@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
