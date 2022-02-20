import {MigrationInterface, QueryRunner} from 'typeorm';

export class addProjectsToUsers1645398289595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
