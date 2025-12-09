import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // you can use DATABASE_URL or a DIRECT_URL here
    url: env("DIRECT_URL") ?? env("DATABASE_URL"),
  },
});

        
        