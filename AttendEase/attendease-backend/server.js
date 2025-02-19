const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log("✅ Connected to PostgreSQL!");
}

main().catch((e) => {
  console.error("❌ Error connecting to database:", e);
  process.exit(1);
});
