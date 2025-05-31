import Analytics from "./BarChart/Analytics"
import "./DashboardContainer.css"
import InfoContainer from "./InfoContainer/InfoContainer"


function DashboardContainer(){


    return(
        <div className="dashboard-wrapper">
            <h1>
                Performance Dashboard
            </h1>
            <div className="dashboard-container">
                <InfoContainer 
                    imageLink="https://img.icons8.com/?size=100&id=DLTrkIQld7w5&format=png&color=FFFFFF" 
                    infoHeader="Number of Clicks This Month"
                    infoContent="3000"
                    backgroundColor="#E67E85" 
                />
                <InfoContainer 
                    imageLink="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=FFFFFF" 
                    infoHeader="Number of Clicks This Year"
                    infoContent="5000"
                    backgroundColor="#85D6F2" 
                />
                <InfoContainer 
                    imageLink="https://img.icons8.com/?size=100&id=roVzG8uWVx3J&format=png&color=FFFFFF" 
                    infoHeader="Number of Short URLs Created"
                    infoContent="24"
                    backgroundColor="#85E685"
                />
                <div className="barchart">
                    <p>
                        Clicks Each Month
                    </p>
                    <Analytics/>
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer