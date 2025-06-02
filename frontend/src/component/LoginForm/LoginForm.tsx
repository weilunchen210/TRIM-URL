import { useState } from 'react'
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router'
import { dummyLogin, loginUser } from '../../services/UserService'
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

    const handleDummySubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            await dummyLogin();
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
            <img src="https://img.icons8.com/?size=100&id=11322&format=png&color=000000" className="logo"></img>
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
                    <button className="button dummy-login-button" onClick={handleDummySubmit}>
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
