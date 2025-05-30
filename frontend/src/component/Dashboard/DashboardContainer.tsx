import Analytics from "./BarChart/Analytics"
import "./DashboardContainer.css"


function DashboardContainer(){


    return(
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <div className="container">Clicks per month</div>
                <div className="container">Clicks per year</div>
                <div className="container">Active Links</div>
                <div className="barchart ">Analytics
                    <Analytics/>
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer