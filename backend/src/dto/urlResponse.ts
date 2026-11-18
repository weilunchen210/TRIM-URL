import type { Url } from '../generated/prisma/client.js';

export function toUrlResponse(url: Url) {
    return {
        _id: url.id,
        name: url.name,
        originalUrl: url.originalUrl,
        shortenedUrl: url.shortenedUrl,
        User: url.userId,
        clicks: url.clicks,
        createdAt: url.createdAt,
    };
}
