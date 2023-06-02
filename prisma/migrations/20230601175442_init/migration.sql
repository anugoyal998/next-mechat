-- CreateTable
CREATE TABLE `FriendRequest` (
    `sndId` VARCHAR(191) NOT NULL,
    `recId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FriendRequest_sndId_recId_key`(`sndId`, `recId`),
    PRIMARY KEY (`sndId`, `recId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_sndId_fkey` FOREIGN KEY (`sndId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
