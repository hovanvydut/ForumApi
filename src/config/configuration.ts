import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
require('dotenv').config();

const setting = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    sync: process.env.DB_TYPEORM_SYNC === 'true' ? true : false,
  },
  bcrypt: {
    saltRound: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'hovanvydut@gmail.com',
    expires: process.env.JWT_EXPIRATION_TIME || '5184000s',
  },
};

interface JwtConfig {
  secret: string;
  expires: string | number;
}

export class Config {
  private setting = setting;
  private static instance;

  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  getAll() {
    return this.setting;
  }

  getTypeormConfig(): TypeOrmModuleOptions {
    const dbConfig = this.setting.database;
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

  getBcryptConfig() {
    return this.setting.bcrypt;
  }

  getJwtConfig(): JwtModuleOptions {
    const jwtConfig = this.setting.jwt;

    return {
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expires,
      },
    };
  }
}
