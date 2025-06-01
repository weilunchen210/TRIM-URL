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
            <img src="https://img.icons8.com/?size=100&id=11322&format=png&color=000000" className="logo"></img>
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
