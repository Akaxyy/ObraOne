import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL for CLI operations (migrations, db push)
    // Runtime uses DATABASE_URL via the PrismaPg adapter
    url: env("DIRECT_URL"),
  },
});
