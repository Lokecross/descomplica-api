import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLots1608320054493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lots',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'enterpriseId',
            type: 'uuid',
          },
          {
            name: 'sankhya_id',
            type: 'varchar',
          },
          {
            name: 'enterprise_sankhya_id',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'varchar',
          },
          {
            name: 'area',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'block',
            type: 'varchar',
          },
          {
            name: 'initials_situation',
            type: 'varchar',
          },
          {
            name: 'situation',
            type: 'varchar',
          },
          {
            name: 'x',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'y',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'config_right',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'config_left',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'config_front',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'config_back',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'config_chamfer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'config_variant',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measure_front',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measure_back',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measure_right',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measure_left',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measure_chamfer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measure_variant',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reservation_timer',
            type: 'varchar',
          },
          {
            name: 'note',
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
      'lots',
      new TableForeignKey({
        name: 'lots_enterpriseId',
        columnNames: ['enterpriseId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enterprises',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lots', 'lots_enterpriseId');

    await queryRunner.dropTable('lots');
  }
}
