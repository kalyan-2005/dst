/*
  Warnings:

  - You are about to drop the column `user_id` on the `Issue` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_user_id_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
