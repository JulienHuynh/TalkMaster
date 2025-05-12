/*
  Warnings:

  - You are about to drop the column `roomId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_roomId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "roomId",
ADD COLUMN     "Roomid" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_Roomid_fkey" FOREIGN KEY ("Roomid") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
