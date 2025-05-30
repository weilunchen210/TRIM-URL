import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import SideBar from "../component/SideBar/SideBar";
import DashboardContainer from "../component/Dashboard/DashboardContainer";


function Dashboard() {
  const navigate = useNavigate()

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       navigate('/main');
//     }
//   }, [navigate]);
  
    return (
      <div>
        <SideBar />
        <DashboardContainer/>
      </div>
    )
  }

export default Dashboard