import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFarmTable1679244074958 implements MigrationInterface {
    public name = "CreateFarmTable1679244074958"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "farm" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "name" character varying NOT NULL, 
                "address" character varying NOT NULL, 
                "lat" double precision NOT NULL, 
                "long" double precision NOT NULL, 
                "owner" character varying NOT NULL, 
                "size" double precision NOT NULL, 
                "yield" double precision NOT NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_74f5b8970e621e8d3ee24b5de21" UNIQUE ("owner"), 
                CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "farm"`);
    }

}
