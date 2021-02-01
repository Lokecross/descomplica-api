import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStartDateAttendances1612208506963
  implements MigrationInterface {
  private tableName = 'attendances';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'startDate',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'startDate');
  }
}
