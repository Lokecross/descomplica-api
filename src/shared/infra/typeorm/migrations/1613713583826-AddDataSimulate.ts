import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDataSimulate1613713583826
  implements MigrationInterface {
  private tableName = 'simulates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.tableName, [
      new TableColumn({
        name: 'value',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'input',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'price',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'deadline',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'period',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'tax',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'notes',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'reservationId',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'reservationId');
    await queryRunner.dropColumn(this.tableName, 'notes');
    await queryRunner.dropColumn(this.tableName, 'tax');
    await queryRunner.dropColumn(this.tableName, 'period');
    await queryRunner.dropColumn(this.tableName, 'deadline');
    await queryRunner.dropColumn(this.tableName, 'type');
    await queryRunner.dropColumn(this.tableName, 'price');
    await queryRunner.dropColumn(this.tableName, 'input');
    await queryRunner.dropColumn(this.tableName, 'value');
  }
}
