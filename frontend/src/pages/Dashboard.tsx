import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import RegisterForm from "../component/RegisterForm/RegisterForm";
import SideBar from "../component/SideBar/SideBar";
import UrlList from "../component/Dashboard/UrlList/UrlList";


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
        <main className="dashboard-main">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>
                <UrlList />
            </main>
      </div>
    )
  }

export default Dashboard