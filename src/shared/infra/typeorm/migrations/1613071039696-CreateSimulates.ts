import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSimulates1613071039696
  implements MigrationInterface {
  private tableName = 'simulates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
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
            name: 'is_financed',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'is_price',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'period',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tax',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deadline',
            type: 'varchar',
            isNullable: true,
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
      this.tableName,
      new TableForeignKey({
        name: 'SimulateCustomer',
        columnNames: ['customerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'SimulateLot',
        columnNames: ['lotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lots',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'SimulateLot');

    await queryRunner.dropForeignKey(this.tableName, 'SimulateCustomer');

    await queryRunner.dropTable(this.tableName);
  }
}
