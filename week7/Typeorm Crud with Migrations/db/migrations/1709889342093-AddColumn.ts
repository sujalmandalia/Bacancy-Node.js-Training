import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1709889342093 implements MigrationInterface {
    name = 'AddColumn1709889342093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
