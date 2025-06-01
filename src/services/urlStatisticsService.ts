import { monthyData } from '../dto/monthlyData.js';
import { UrlDto } from '../dto/UrlDto.js';
import Url from '../models/url.js'
import UrlClickHistory from '../models/urlClickHistory.js';

export class urlStatisticsService{
    

    async getStatistics(userId:string){
        
        const numberOfURLs = await this.getNumberOfURLs(userId)
        const numberOfClicksThisMonth = await this.getNumberOfClicksThisMonth(userId)
        const numberOfClicksLast12Months = await this.getNumberOfClicksLast12Months(userId)
        const totalClicks = await this.calculateTotalNumberOfClicks(numberOfClicksLast12Months)

        const statistics ={
            numberOfURLs,
            numberOfClicksThisMonth,
            numberOfClicksLast12Months,
            totalClicks 
        }
        
        return statistics
    }

    async getNumberOfURLs(userId:string){
        const numberOfURL = Url.countDocuments({_id:userId})
        return numberOfURL;
    }

    async getNumberOfClicksThisMonth(userId: string) {
        
        const today = new Date();
        
        const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0);
        
        const endOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59);

        const userUrls = await Url.find({ User: userId }).select('_id');
        const userUrlIds = userUrls.map(url => url._id);

        if (userUrlIds.length === 0) {
            return 0; 
        }

        const clicksThisMonth = await UrlClickHistory.countDocuments({
            Url: { $in: userUrlIds },
            clickedDate: {
                $gte: startOfCurrentMonth,
                $lte: endOfCurrentMonth
            }
        });

        return clicksThisMonth;
    }

    async getNumberOfClicksLast12Months(userId: string) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); 
        
        const monthlyData = [];

        const userUrls = await Url.find({ User: userId }).select('_id');
        const userUrlIds = userUrls.map(url => url._id);
        
        for (let i = 0; i < 12; i++) {
            let targetMonth = currentMonth - 11 + i; 
            let targetYear = currentYear;
            
            if (targetMonth < 0) {
                targetMonth += 12;
                targetYear -= 1;
            }

            const startOfMonth = new Date(targetYear, targetMonth, 1, 0, 0, 0, 0);
            const endOfMonth = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);
            
            
            let clicksForMonth = 0;
            if (userUrlIds.length > 0) {
                clicksForMonth = await UrlClickHistory.countDocuments({
                    Url: { $in: userUrlIds },
                    clickedDate: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                });
            }
            
            monthlyData.push({
                year: targetYear,
                month: startOfMonth.toLocaleString('default', { month: 'long' }),
                clicks: clicksForMonth,
            });
        }
        
        return monthlyData;
    }

    async calculateTotalNumberOfClicks(monthlyData:monthyData[]){

        let TotalClicks = 0

        for(let i = 0; i < monthlyData.length; i++){
            TotalClicks = TotalClicks + monthlyData[i].clicks
        }

        return TotalClicks
    } 


}