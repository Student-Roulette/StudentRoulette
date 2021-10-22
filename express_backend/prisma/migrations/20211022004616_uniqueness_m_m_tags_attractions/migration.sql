/*
  Warnings:

  - You are about to drop the `_AttractionTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[presenceId]` on the table `Attraction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_AttractionTags" DROP CONSTRAINT "_AttractionTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttractionTags" DROP CONSTRAINT "_AttractionTags_B_fkey";

-- DropTable
DROP TABLE "_AttractionTags";

-- CreateTable
CREATE TABLE "_AttractionToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttractionToTag_AB_unique" ON "_AttractionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_AttractionToTag_B_index" ON "_AttractionToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Attraction_presenceId_key" ON "Attraction"("presenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "_AttractionToTag" ADD FOREIGN KEY ("A") REFERENCES "Attraction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttractionToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
