// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client')
// add prisma to the NodeJS global type
// TODO : downgraded @types/node to 15.14.1 to avoid error on NodeJS.Global

const prisma = new PrismaClient();

// Prevent multiple instances of Prisma Client in development


// const prisma = global.prisma || new PrismaClient();



module.exports = prisma;