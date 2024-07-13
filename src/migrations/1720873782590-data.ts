import { MigrationInterface, QueryRunner } from 'typeorm';

export class Data1720873782590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO \`users\`(\`id\`, \`username\`, \`password\`, \`nick_name\`, \`email\`, \`headPic\`, \`phoneNumber\`, \`isFrozen\`, \`isAdmin\`, \`createTime\`, \`updateTime\`) VALUES 
            (1, 'zhangsan', '96e79218965eb72c92a549dd5a330112', '张三', 'xxx@xx.com', NULL, '13233323333', 0, 1, '2024-03-01 06:45:12.061740', '2024-03-01 06:45:12.061740'),
            (2, 'lisi', 'e3ceb5881a0a1fdaad01296d7554868d', '李四', 'yy@yy.com', NULL, NULL, 0, 0, '2024-03-01 06:45:12.083406', '2024-03-01 06:45:12.083406'),
            (3, 'rain', 'e10adc3949ba59abbe56e057f20f883e', '23', '2331336537@qq.com', NULL, NULL, 0, 0, '2024-04-08 09:54:44.643931', '2024-04-08 09:54:44.643931');
        `);
    await queryRunner.query(
      "INSERT INTO `roles`(`id`, `name`) VALUES (1, '管理员');",
    );
    await queryRunner.query(
      "INSERT INTO `roles`(`id`, `name`) VALUES (2, '普通用户');",
    );
    await queryRunner.query(
      'INSERT INTO `user_roles`(`usersId`, `rolesId`) VALUES (1, 1);',
    );
    await queryRunner.query(
      'INSERT INTO `user_roles`(`usersId`, `rolesId`) VALUES (2, 2);',
    );
    await queryRunner.query(
      "INSERT INTO `permissions`(`id`, `code`, `description`) VALUES (1, 'ccc', '访问 ccc 接口');",
    );
    await queryRunner.query(
      "INSERT INTO `permissions`(`id`, `code`, `description`) VALUES (2, 'ddd', '访问 ddd 接口');",
    );

    await queryRunner.query(
      'INSERT INTO `role_permissions`(`rolesId`, `permissionsId`) VALUES (1, 1);',
    );
    await queryRunner.query(
      'INSERT INTO `role_permissions`(`rolesId`, `permissionsId`) VALUES (1, 2);',
    );
    await queryRunner.query(
      'INSERT INTO `role_permissions`(`rolesId`, `permissionsId`) VALUES (2, 1);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
