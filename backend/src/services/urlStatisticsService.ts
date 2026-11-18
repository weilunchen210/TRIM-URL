import { monthyData } from '../dto/monthlyData.js';
import { UrlRepository } from '../repositories/urlRepository.js';
import { UrlClickHistoryRepository } from '../repositories/urlClickHistoryRepository.js';

const SERVER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export class urlStatisticsService {

    constructor(
        private readonly urlRepository = new UrlRepository(),
        private readonly clickHistoryRepository = new UrlClickHistoryRepository(),
    ) {}

    async getStatistics(userId: string) {

        const [numberOfURLs, numberOfClicksLast12Months] = await Promise.all([
            this.getNumberOfURLs(userId),
            this.getNumberOfClicksLast12Months(userId),
        ]);
        const numberOfClicksThisMonth = numberOfClicksLast12Months[11].clicks;
        const totalClicks = this.calculateTotalNumberOfClicks(numberOfClicksLast12Months);

        const statistics = {
            numberOfURLs,
            numberOfClicksThisMonth,
            numberOfClicksLast12Months,
            totalClicks
        }

        return statistics
    }

    async getNumberOfURLs(userId: string) {
        return this.urlRepository.countByUser(userId);
    }

    async getNumberOfClicksLast12Months(userId: string): Promise<monthyData[]> {
        const today = new Date();
        const startOfRange = new Date(today.getFullYear(), today.getMonth() - 11, 1, 0, 0, 0, 0);

        const rows = await this.clickHistoryRepository.countByMonthForUser(userId, startOfRange, SERVER_TIME_ZONE);
        const clicksByMonth = new Map(rows.map(row => [row.month, row.clicks]));

        const monthlyData: monthyData[] = [];
        for (let i = 0; i < 12; i++) {
            const monthStart = new Date(startOfRange.getFullYear(), startOfRange.getMonth() + i, 1);
            const key = `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, '0')}`;

            monthlyData.push({
                year: monthStart.getFullYear(),
                month: monthStart.toLocaleString('default', { month: 'long' }),
                clicks: clicksByMonth.get(key) ?? 0,
            });
        }

        return monthlyData;
    }

    calculateTotalNumberOfClicks(monthlyData: monthyData[]) {
        return monthlyData.reduce((total, month) => total + month.clicks, 0);
    }
}
