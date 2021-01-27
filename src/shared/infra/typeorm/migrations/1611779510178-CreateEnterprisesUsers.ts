import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEnterprisesUsers1611779510178
  implements MigrationInterface {
  private tableName = 'enterprises_users_users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'enterprisesId',
            type: 'uuid',
          },
          {
            name: 'usersId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'EnterpriseUsersEnterprise',
        columnNames: ['enterprisesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enterprises',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'EnterpriseUsersUser',
        columnNames: ['usersId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'EnterpriseUsersUser');

    await queryRunner.dropForeignKey(
      this.tableName,
      'EnterpriseUsersEnterprise',
    );

    await queryRunner.dropTable(this.tableName);
  }
}
