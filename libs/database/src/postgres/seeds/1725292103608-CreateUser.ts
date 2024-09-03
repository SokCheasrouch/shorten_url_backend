import { User } from '@modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1725292103608 implements MigrationInterface {
  name = 'CreateUser1725292103608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const column = { name: 'jonh' };
    await queryRunner.manager.insert('users', column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
