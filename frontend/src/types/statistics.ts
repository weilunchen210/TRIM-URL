export interface MonthlyData {
    year: number;
    month: string;  
    clicks: number;
}

export interface StatisticsResponse {
    numberOfURLs: number;
    numberOfClicksThisMonth: number;
    numberOfClicksLast12Months: MonthlyData[];
    totalClicks: number;
}