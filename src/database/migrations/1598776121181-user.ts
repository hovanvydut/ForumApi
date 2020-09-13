import { MigrationInterface, QueryRunner } from 'typeorm';

// npx typeorm migration:create -n user

export class user1598776121181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
