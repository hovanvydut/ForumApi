import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  sync: boolean;
}

interface JwtConfig {
  secret: string;
  expires: string | number;
}

@Injectable()
export class MyConfigService {
  constructor(private readonly configService: ConfigService) {}

  getJwtConfig(): JwtModuleOptions {
    const jwtConfig = this.configService.get<JwtConfig>('jwt');

    return {
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expires,
      },
    };
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const dbConfig = this.configService.get<DatabaseConfig>('database');
    return {
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.name,
      username: dbConfig.username,
      password: dbConfig.password,
      synchronize: dbConfig.sync,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    };
  }
}
