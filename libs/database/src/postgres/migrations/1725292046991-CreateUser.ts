import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1725292046991 implements MigrationInterface {
  name = 'CreateUser1725292046991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns = [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
    ];
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [...columns],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
