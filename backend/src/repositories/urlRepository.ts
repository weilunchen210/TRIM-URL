import { prisma } from '../db.js';
import type { Url } from '../generated/prisma/client.js';

export interface CreateUrlData {
    name: string;
    originalUrl: string;
    shortenedUrl: string;
    userId: string;
}

export interface UpdateUrlData {
    name: string;
    originalUrl: string;
    shortenedUrl: string;
}

export class UrlRepository {

    create(data: CreateUrlData): Promise<Url> {
        return prisma.url.create({ data });
    }

    findAllByUser(userId: string): Promise<Url[]> {
        return prisma.url.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
        });
    }

    findByIdForUser(id: string, userId: string): Promise<Url | null> {
        return prisma.url.findFirst({ where: { id, userId } });
    }

    countByUser(userId: string): Promise<number> {
        return prisma.url.count({ where: { userId } });
    }

    async existsByShortenedUrl(shortenedUrl: string, excludeId?: string): Promise<boolean> {
        const url = await prisma.url.findFirst({
            where: {
                shortenedUrl,
                ...(excludeId ? { id: { not: excludeId } } : {}),
            },
            select: { id: true },
        });
        return url != null;
    }

    update(id: string, data: UpdateUrlData): Promise<Url> {
        return prisma.url.update({ where: { id }, data });
    }

    async deleteForUser(id: string, userId: string): Promise<boolean> {
        const result = await prisma.url.deleteMany({ where: { id, userId } });
        return result.count > 0;
    }

    recordClick(shortenedUrl: string): Promise<Url | null> {
        return prisma.$transaction(async (tx) => {
            const found = await tx.url.findUnique({ where: { shortenedUrl }, select: { id: true } });
            if (!found) return null;

            const url = await tx.url.update({
                where: { id: found.id },
                data: { clicks: { increment: 1 } },
            });
            await tx.urlClickHistory.create({ data: { urlId: url.id } });
            return url;
        });
    }
}
