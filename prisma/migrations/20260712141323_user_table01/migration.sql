-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('VEG', 'NON_VEG');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "diet" "Diet";
