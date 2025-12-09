// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Prisma 7 "client" engine + Postgres adapter.
// TLS behavior is controlled via the DATABASE_URL (sslmode=...).
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;







