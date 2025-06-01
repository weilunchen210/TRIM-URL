
import { Link, useLocation, useNavigate } from 'react-router';
import Cookies from 'js-cookie'
import './Sidebar.css';
import { useEffect, useState } from 'react';

const Sidebar = () => {
    const [username,setUsername] = useState("")
    const [profilePictureURL, setProfilePictureURL] = useState("")

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const storedUsername = localStorage.getItem('username')
        const storedProfilePictureURL = localStorage.getItem('profilePictureURL')

        if(storedUsername){
            setUsername(storedUsername)
        }
        if(storedProfilePictureURL){
            setProfilePictureURL(storedProfilePictureURL)
        }

    }, []);

    const sideBarItems = [
        {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'https://img.icons8.com/?size=100&id=vFqlDrzMYOT0&format=png&color=000000'
        },
        {
        path: '/my-urls',
        name: 'My URLs',
        icon: 'https://img.icons8.com/?size=100&id=7867&format=png&color=000000'
        },
        {
        path: '/profile',
        name: 'Profile Settings',
        icon: 'https://img.icons8.com/?size=100&id=82535&format=png&color=000000'
        }
    ];

    const handleLogout = () => {
        Cookies.remove("token")
        localStorage.removeItem('username')
        localStorage.removeItem('profilePictureURL')
        localStorage.removeItem('email')
        navigate('/login')
    }

    return (
        <>
        <div className={'sidebar'}>
            <div className="sidebar-header">
                <h2 className="sidebar-title">TRIM URL</h2>
                <p className="icon-credit">icons by <a href="">icons8.com</a></p>
            </div>

            <nav className="sidebar-nav">
                <div className = "user-details">
                    <img className="profile-picture" src={profilePictureURL}>
                    </img>
                    <p>
                        {username}
                    </p>
                </div>
            <ul className="nav-list">
                {sideBarItems.map((item) => (
                <li key={item.path} className="nav-item">
                    <Link 
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                    <img  className="nav-icon"src={item.icon}></img>
                    <span className="nav-text">{item.name}</span>
                    </Link>
                </li>
                ))}
            </ul>
            </nav>

            <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
                <img className="nav-icon" src="https://img.icons8.com/?size=100&id=105495&format=png&color=000000"></img>
                <span className="nav-text">Logout</span>
            </button>
            </div>
        </div>
        </>
    );
};

export default Sidebar;