import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724723383822 implements MigrationInterface {
    name = 'Migration1724723383822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board" ("boardNo" SERIAL NOT NULL, "userId" character varying NOT NULL, "contents" character varying NOT NULL, "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_72f2437f2d1a0cfe91ae4120f0f" PRIMARY KEY ("boardNo"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userNo" SERIAL NOT NULL, "userId" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "boardCount" integer, CONSTRAINT "UQ_d72ea127f30e21753c9e229891e" UNIQUE ("userId"), CONSTRAINT "PK_1d677a9fdd89ee8192065c421a7" PRIMARY KEY ("userNo"))`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_c9951f13af7909d37c0e2aec484"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }

}
