/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subCategoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_categoryName_key` ON `Category`(`categoryName`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_subCategoryName_key` ON `Category`(`subCategoryName`);
