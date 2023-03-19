import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationships1679255151330 implements MigrationInterface {
    public name = "UpdateRelationships1679255151330"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "long" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm" ADD CONSTRAINT "FK_fe2fe67c9ca2dc03fff76cd04a9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_fe2fe67c9ca2dc03fff76cd04a9"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "long" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "farm" DROP COLUMN "userId"`);
    }

}
