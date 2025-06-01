
import { Link, useLocation, useNavigate } from 'react-router';
import Cookies from 'js-cookie'
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="logo">
                <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
            </svg>
            <h2 className="sidebar-title">TRIM URL</h2>
        </div>

        <nav className="sidebar-nav">
            <div className = "user-details">
                <img className="profile-picture" src="https://avatar.iran.liara.run/public/16">
                </img>
                <p>
                    USER 1
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