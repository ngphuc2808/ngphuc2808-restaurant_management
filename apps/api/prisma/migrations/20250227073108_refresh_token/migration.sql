/*
  Warnings:

  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `RefreshToken` DROP PRIMARY KEY,
    MODIFY `token` VARCHAR(500) NOT NULL,
    ADD PRIMARY KEY (`token`);
