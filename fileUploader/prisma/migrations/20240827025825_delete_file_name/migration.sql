/*
  Warnings:

  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originalname,folderId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_fileName_folderId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileName";

-- CreateIndex
CREATE UNIQUE INDEX "File_originalname_folderId_key" ON "File"("originalname", "folderId");
