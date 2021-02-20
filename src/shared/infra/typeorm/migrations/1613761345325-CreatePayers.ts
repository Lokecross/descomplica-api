import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePayers1613761345325 implements MigrationInterface {
  private tableName = 'payers';

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
            name: 'simulateId',
            type: 'uuid',
          },
          {
            name: 'responsible',
            type: 'bool',
            isNullable: true,
          },
          {
            name: 'document',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'village',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rg',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rg_emission',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rg_agency',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birth',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'father',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mother',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'profession',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'marital_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_rg',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_birth',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rg_b64',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cpf_b64',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address_b64',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'marriage_b64',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_rg_b64',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'spouse_cpf_b64',
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
        name: 'PayerSimulate',
        columnNames: ['simulateId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'simulates',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'PayerSimulate');

    await queryRunner.dropTable(this.tableName);
  }
}
