/*
  Warnings:

  - You are about to drop the `alternativies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "alternativies" DROP CONSTRAINT "alternativies_question_id_fkey";

-- DropTable
DROP TABLE "alternativies";

-- CreateTable
CREATE TABLE "alternatives" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "true_or_false" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "alternatives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
