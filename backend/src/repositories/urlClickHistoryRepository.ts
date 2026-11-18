import { prisma } from '../db.js';

export interface MonthlyClickCount {
    month: string;
    clicks: number;
}

export class UrlClickHistoryRepository {

    countByMonthForUser(userId: string, since: Date, timeZone: string): Promise<MonthlyClickCount[]> {
        return prisma.$queryRaw<MonthlyClickCount[]>`
            SELECT to_char(date_trunc('month', h.clicked_date AT TIME ZONE ${timeZone}), 'YYYY-MM') AS month,
                   COUNT(*)::int AS clicks
            FROM url_click_history h
            JOIN urls u ON u.id = h.url_id
            WHERE u.user_id = ${userId}::uuid
              AND h.clicked_date >= ${since}
            GROUP BY 1
        `;
    }
}
