import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPartnerIdToPayer1616206709445
  implements MigrationInterface {
  private tableName = 'payers';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'sankhyaPartnerId',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'sankhyaPartnerId');
  }
}
