/*
  Warnings:

  - The primary key for the `friendrequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recId` on the `friendrequest` table. All the data in the column will be lost.
  - You are about to drop the column `sndId` on the `friendrequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sndEmail,recEmail]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recEmail` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sndEmail` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `friendrequest` DROP FOREIGN KEY `FriendRequest_recId_fkey`;

-- DropIndex
DROP INDEX `FriendRequest_sndId_recId_key` ON `friendrequest`;

-- AlterTable
ALTER TABLE `friendrequest` DROP PRIMARY KEY,
    DROP COLUMN `recId`,
    DROP COLUMN `sndId`,
    ADD COLUMN `recEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `sndEmail` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`sndEmail`, `recEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `FriendRequest_sndEmail_recEmail_key` ON `FriendRequest`(`sndEmail`, `recEmail`);

-- AddForeignKey
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_recEmail_fkey` FOREIGN KEY (`recEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
