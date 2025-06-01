import { useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import RegisterForm from "../component/RegisterForm/RegisterForm";


function Register() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
    return (
      <div>
        <RegisterForm />
      </div>
    )
  }

export default Register