/**
 * This file is only used for seeding purpose
 */
module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
  factories: ['src/database/seeders-dev/factories/factory/*.factory{.ts,.js}'],
  seeds: ['src/database/seeders-dev/seeder/*.seed{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
