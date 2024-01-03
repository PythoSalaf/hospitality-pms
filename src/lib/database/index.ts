import { PrismaClient } from "@prisma/client";
import ENV from "~~/config/enviroment";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (ENV.NODE_ENV !== "production") globalThis.prisma = db;
