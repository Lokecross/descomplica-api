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
            name: 'attendanceId',
            type: 'uuid',
          },
          {
            name: 'lotId',
            type: 'uuid',
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
        name: 'SimulateAttendance',
        columnNames: ['attendanceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attendances',
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

    await queryRunner.dropForeignKey(this.tableName, 'SimulateAttendance');

    await queryRunner.dropTable(this.tableName);
  }
}
