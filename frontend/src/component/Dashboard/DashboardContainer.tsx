import { useEffect, useState } from "react";
import Analytics from "./BarChart/Analytics"
import "./DashboardContainer.css"
import InfoContainer from "./InfoContainer/InfoContainer"
import { getStatistics } from "../../services/UrlStatisticsService";
import type { StatisticsResponse } from "../../types/statistics";


function DashboardContainer(){

    const [loading, setLoading] = useState(true);
    const [statistics,setStatistics] = useState<StatisticsResponse|null>(null);
    const [error,setError] = useState(false)

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const data = await getStatistics();
            setStatistics(data)
        } catch (error) {
            setError(true)
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    const handleRefresh = () => {
        setError(false)
        fetchStatistics
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <div className="url-list-loading">Loading URLs...</div>
            </div>
    );
    }

    if(!statistics){
        if(error){
            return(
            <div className="error-container">
                <p>Failed to load statistics</p>
                <button onClick={handleRefresh}>Retry</button>
            </div>
        )
        }
        return(
            <>
            </>
        )
    }

    return(
        <div className="dashboard-wrapper">
            <h1>
                Performance Dashboard
            </h1>
            <div className="dashboard-container">
                <InfoContainer 
                    imageLink="https://img.icons8.com/?size=100&id=DLTrkIQld7w5&format=png&color=FFFFFF" 
                    infoHeader="Number of Clicks This Month"
                    infoContent={statistics.numberOfClicksThisMonth.toString()}
                    backgroundColor="#E67E85" 
                />
                <InfoContainer 
                    imageLink="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=FFFFFF" 
                    infoHeader="Number of Clicks This Year"
                    infoContent={statistics?.totalClicks.toString()}
                    backgroundColor="#85D6F2" 
                />
                <InfoContainer 
                    imageLink="https://img.icons8.com/?size=100&id=roVzG8uWVx3J&format=png&color=FFFFFF" 
                    infoHeader="Number of Short URLs Created"
                    infoContent={statistics.numberOfURLs.toString()}
                    backgroundColor="#85E685"
                />
                <div className="barchart">
                    <p>
                        Clicks Each Month
                    </p>
                    <Analytics data={statistics.numberOfClicksLast12Months}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer