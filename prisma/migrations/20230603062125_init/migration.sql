/*
  Warnings:

  - A unique constraint covering the columns `[sndEmail]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recEmail]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `FriendRequest_sndEmail_recEmail_key` ON `friendrequest`;

-- CreateIndex
CREATE UNIQUE INDEX `FriendRequest_sndEmail_key` ON `FriendRequest`(`sndEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `FriendRequest_recEmail_key` ON `FriendRequest`(`recEmail`);
