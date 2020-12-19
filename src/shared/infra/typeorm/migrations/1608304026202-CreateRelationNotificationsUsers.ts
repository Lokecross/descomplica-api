import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationNotificationsUsers1608304026202
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications_users_users',
        columns: [
          {
            name: 'notificationsId',
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
      'notifications_users_users',
      new TableForeignKey({
        name: 'notifications_users_users_notificationsId',
        columnNames: ['notificationsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'notifications',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'notifications_users_users',
      new TableForeignKey({
        name: 'plans_cities_cities_usersId',
        columnNames: ['usersId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'notifications_users_users',
      'notifications_users_usersId',
    );

    await queryRunner.dropForeignKey(
      'notifications_users_users',
      'notifications_users_users_notificationsId',
    );

    await queryRunner.dropTable('notifications_users_users');
  }
}
