import { useEffect, useState } from "react";
import "./ProfileContainer.css"
import type { editProfileRequest } from "../../types/editProfile";
import { editUser } from "../../services/UserService";



function ProfileContainer(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedProfilePictureURL = localStorage.getItem('profilePictureURL');

        if (storedUsername) {
            setUsername(storedUsername)
        };

        if (storedEmail) {
            setEmail(storedEmail)
        };

        if (storedProfilePictureURL) {
            setProfilePictureURL(storedProfilePictureURL)
        };
    }, []);

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (!currentPassword.trim()) {
                alert('Current password is required to update profile');
                return;
            }

            if (!newPassword.trim()) {
                alert('New password is required to update profile');
                return;
            }

            const formData: editProfileRequest = {
                username,
                email,
                currentPassword,
                newPassword,
                profilePictureURL
            };

            const response = await editUser(formData);
            
            
            alert('Profile updated successfully!');
            
            setCurrentPassword("");
            setNewPassword("");
            window.location.reload();
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return(
        <div className="profile-container-wrapper">
            <div className="profile-container">
                <img className="profile-picture" src={profilePictureURL}>
                </img>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="input-grid">

                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-group edit-profile-picture-url">
                            <label>Profile Picture URL</label>
                            <input
                                type="url"
                                placeholder="Profile Picture URL"
                                value={profilePictureURL}
                                onChange={(e) => setProfilePictureURL(e.target.value)}
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