-- CreateTable
CREATE TABLE "Research" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "allergies" TEXT NOT NULL,
    "chronicDiseases" TEXT,
    "dailyActivityLevel" TEXT NOT NULL,
    "pastInjuries" TEXT,
    "mainGoal" TEXT NOT NULL,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);
