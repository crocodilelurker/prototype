/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "AppGoal" AS ENUM ('WEIGHT_LOSE', 'WEIGHT_GAIN', 'WEIGHT_STABLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "appGoal" "AppGoal",
ADD COLUMN     "bmi" DOUBLE PRECISION,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "isNewUser" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "targetCalories" DROP NOT NULL,
ALTER COLUMN "targetCarbs" DROP NOT NULL,
ALTER COLUMN "targetFats" DROP NOT NULL,
ALTER COLUMN "targetProteins" DROP NOT NULL;
