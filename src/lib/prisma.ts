import { PrismaClient } from '@prisma/client';
import { NODE_ENV } from '../constants/env.ts';

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
  prisma.$connect();
}

export { prisma };
