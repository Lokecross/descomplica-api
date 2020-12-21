import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAttendances1608577421314
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendances',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customerId',
            type: 'uuid',
          },
          {
            name: 'lotId',
            type: 'uuid',
          },
          {
            name: 'brokerId',
            type: 'uuid',
          },
          {
            name: 'note',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'attendances',
      new TableForeignKey({
        name: 'attendances_customerId',
        columnNames: ['customerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'attendances',
      new TableForeignKey({
        name: 'attendances_lotId',
        columnNames: ['lotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lots',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'attendances',
      new TableForeignKey({
        name: 'attendances_brokerId',
        columnNames: ['brokerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brokers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attendances', 'attendances_brokerId');
    await queryRunner.dropForeignKey('attendances', 'attendances_lotId');
    await queryRunner.dropForeignKey('attendances', 'attendances_customerId');

    await queryRunner.dropTable('attendances');
  }
}
