-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "otp" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
