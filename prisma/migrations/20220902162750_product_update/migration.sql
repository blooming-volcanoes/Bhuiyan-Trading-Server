/*
  Warnings:

  - You are about to drop the `gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `gallery` DROP FOREIGN KEY `Gallery_productId_fkey`;

-- DropTable
DROP TABLE `gallery`;
