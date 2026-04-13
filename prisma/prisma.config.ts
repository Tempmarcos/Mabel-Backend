import "dotenv/config";
import { defineConfig } from "prisma/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não está definida");
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});