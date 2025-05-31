import { useState } from 'react'
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router'
import { loginUser } from '../../services/UserService'
// import { dummyLogin, loginUser } from '../../services/userService';


function  LoginForm() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userDetails = {
            email:email,
            password: password
        }
        try {

            await loginUser(userDetails);
            navigate('/dashboard'); 

        } catch (error) {

            alert('Login failed')
            console.error('Login failed:', error);

        }
    }


  return (
    <div className="login-container-wrapper">
      <div className="login-box">
        <div className ="info-section">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="logo">
                <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
            </svg>
            <h1>
                Trim URL
            </h1>
            <p>
                Streamline your links, amplify your reach
            </p>
        </div>
        <div className ="login-section">
            <div className="login-title">
            <label className ="title">
                Login
            </label>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email">
                    </input>
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        value={password} onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password">
                    </input>
                </div>
                <div className="login-submit">
                    <input 
                        className="button login-button" 
                        type="submit" 
                        value="Login">
                    </input>
                </div>
                <div className="login-submit">
                    <button className="button dummy-login-button">
                        Dummy Login
                    </button>
                </div>
                <div className="register">
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
