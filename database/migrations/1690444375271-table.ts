import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1690444375271 implements MigrationInterface {
    name = 'Table1690444375271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`quota\` int NOT NULL DEFAULT '10', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`links\` (\`id\` int NOT NULL AUTO_INCREMENT, \`short_url\` varchar(255) NOT NULL, \`long_url\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`clicks\` int NOT NULL DEFAULT '0', \`is_diabled\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`links\` ADD CONSTRAINT \`FK_56668229b541edc1d0e291b4c3b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`links\` DROP FOREIGN KEY \`FK_56668229b541edc1d0e291b4c3b\``);
        await queryRunner.query(`DROP TABLE \`links\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
