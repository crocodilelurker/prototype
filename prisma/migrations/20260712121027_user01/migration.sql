/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activity" "ActivityLevel",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "heightCm" DOUBLE PRECISION,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "targetCalories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "targetCarbs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "targetFats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "targetProteins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weightKg" DOUBLE PRECISION;
