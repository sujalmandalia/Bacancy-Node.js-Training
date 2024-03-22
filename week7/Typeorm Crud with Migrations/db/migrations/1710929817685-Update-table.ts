import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1710929817685 implements MigrationInterface {
    name = 'UpdateTable1710929817685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
    }

}
