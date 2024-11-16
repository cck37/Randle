/*
  Warnings:

  - A unique constraint covering the columns `[attribute_id,item_id]` on the table `ItemAttributes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemAttributes" DROP CONSTRAINT "ItemAttributes_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemAttributes" DROP CONSTRAINT "ItemAttributes_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemAttributes" DROP CONSTRAINT "ItemAttributes_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_category_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "ItemAttributes_attribute_id_item_id_key" ON "ItemAttributes"("attribute_id", "item_id");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAttributes" ADD CONSTRAINT "ItemAttributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAttributes" ADD CONSTRAINT "ItemAttributes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAttributes" ADD CONSTRAINT "ItemAttributes_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
