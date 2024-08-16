-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'TECHNICIAN', 'ADMIN');

-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('OPEN', 'VERIFY', 'CLOSE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "location" TEXT,
    "status" "IssueStatus" NOT NULL DEFAULT 'OPEN',
    "assignedTo" TEXT,
    "otp" TEXT,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
