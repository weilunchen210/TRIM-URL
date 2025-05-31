import { useState } from 'react'
import "./RegisterForm.css"
import { useNavigate } from 'react-router'
import { registerUser } from '../../services/UserService'

function  RegisterForm() {
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [profilePicture,setProfilePicture] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = {
            username:username,
            password:password,
            email:email,
            profilePictureURL:profilePicture
        }
        try {
            await registerUser(newUser);
            navigate('/login'); 
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

  return (
    <div className="register-container-wrapper">
      <div className="register-box">
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
        <div className ="register-section">
            <div className="register-title">
            <label className ="title">
                Register
            </label>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username">
                    </input>
                </div>
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
                <div className="input">
                    <input 
                        type="text" 
                        value={profilePicture} 
                        onChange={(e) => setProfilePicture(e.target.value)} 
                        placeholder="ProfilePictureURL">
                    </input>
                </div>
                <div className="register-submit">
                    <input 
                        className="button register-button" 
                        type="submit" 
                        value="Register">
                    </input>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
