import "./ProfileContainer.css"



function ProfileContainer(){



    return(
        <div className="profile-container-wrapper">
            <div className="profile-container">
                <img className="profile-picture" src="https://avatar.iran.liara.run/public/16">
                </img>
                <form className="profile-form">
                    <div className="input-grid">

                        <div className="input-group">
                            <label>Username</label>
                            <input
                                placeholder="Username"
                            />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                placeholder="Email"
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                placeholder="Password"
                            />
                        </div>

                        <div className="input-group">
                            <label>Profile Picture URL</label>
                            <input
                                placeholder="Profile Picture URL"
                            />
                        </div>
                        
                    </div>

                    <button className = "submit" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfileContainer