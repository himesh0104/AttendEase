-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "sessionTime" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
