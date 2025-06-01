import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import SideBar from "../component/SideBar/SideBar";
import ProfileContainer from "../component/ProfileContainer/ProfileContainer";


function Profile() {
  const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
        navigate('/login');
        }
    }, [navigate]
    );

    return (
      <div>
        <SideBar />
        <ProfileContainer />
      </div>
    )
  }

export default Profile