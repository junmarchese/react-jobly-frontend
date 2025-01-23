import React, { useState, useContext, useEffect } from "react";
import JoblyApi from "../JoblyApi";
import UserContext from "../UserContext";
import { useNavigate  } from "react-router-dom";

function Profile() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = currentUser.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
            setFormData(fData => ({ ...fData, password: "" }));
            setFormErrors([]);
            setSaveConfirmed(true);
            setMessage("Profile updated successfully!");
            setCurrentUser(updatedUser);
        } catch (errors) {
            setFormErrors(errors);
            setSaveConfirmed(false);
        }
    }

   
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(fData => ({ 
            ...fData, 
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (
        <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>Username: {currentUser.username}
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        name="firstName"  
                        value={formData.firstName}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm password to make changes:</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                
                {message && <p className="success-message">{message}</p>}
                {formErrors.length
                    ? <alert type="danger" messages={formErrors} />
                    : null}

                {saveConfirmed
                    ?
                    <alert type="success" messages={["Profile updated successfully."]}
                    />
                    : null}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Profile;