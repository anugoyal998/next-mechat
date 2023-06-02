/*
  Warnings:

  - Added the required column `updatedAt` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `friendrequest` DROP FOREIGN KEY `FriendRequest_sndId_fkey`;

-- AlterTable
ALTER TABLE `friendrequest` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` ENUM('ACCEPTED', 'PENDING', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_recId_fkey` FOREIGN KEY (`recId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
