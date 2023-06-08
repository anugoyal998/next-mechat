/*
  Warnings:

  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_friends` DROP FOREIGN KEY `_friends_A_fkey`;

-- DropForeignKey
ALTER TABLE `_friends` DROP FOREIGN KEY `_friends_B_fkey`;

-- DropIndex
DROP INDEX `FriendRequest_sndEmail_key` ON `friendrequest`;

-- DropTable
DROP TABLE `_friends`;

-- CreateIndex
CREATE INDEX `FriendRequest_sndEmail_recEmail_idx` ON `FriendRequest`(`sndEmail`, `recEmail`);
