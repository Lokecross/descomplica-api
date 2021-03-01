import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStatusSimulates1614629260770
  implements MigrationInterface {
  private tableName = 'simulates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'status');
  }
}
