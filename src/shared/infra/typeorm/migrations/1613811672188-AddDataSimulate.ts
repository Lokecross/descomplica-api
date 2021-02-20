import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDataSimulate1613811672188
  implements MigrationInterface {
  private tableName = 'simulates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'contractId',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'contractId');
  }
}
