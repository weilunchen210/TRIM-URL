import { prisma } from '../db.js';

export class HealthRepository {

    async ping(): Promise<void> {
        await prisma.$queryRaw`SELECT 1`;
    }
}
