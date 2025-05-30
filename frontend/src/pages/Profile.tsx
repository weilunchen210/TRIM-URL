import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import SideBar from "../component/SideBar/SideBar";
import ProfileContainer from "../component/ProfileContainer/ProfileContainer";


function Profile() {
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
                <ProfileContainer />
            </main>
      </div>
    )
  }

export default Profile