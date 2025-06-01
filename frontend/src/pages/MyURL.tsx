import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import SideBar from "../component/SideBar/SideBar";
import UrlList from "../component/MyURL/UrlList/UrlList";


function MyURL() {
  const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
        navigate('/login');
        }
    }, [navigate]);
    
  
    return (
      <div>
        <SideBar />
        <UrlList />
      </div>
    )
  }

export default MyURL