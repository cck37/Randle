/*
  Warnings:

  - Added the required column `attributeType` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('number', 'multipart', 'string');

-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "attributeType" "AttributeType" NOT NULL;
