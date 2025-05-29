import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import RegisterForm from "../component/RegisterForm/RegisterForm";
import SideBar from "../component/SideBar/SideBar";


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
        <RegisterForm/>
      </div>
    )
  }

export default Dashboard