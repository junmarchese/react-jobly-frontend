import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    }; 

    return (
        <div className="SignupForm">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>                
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password" 
                        type="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange} 
                        required
                    />
                </div>
                {formErrors.length
                    ? <div className="alert alert-danger" role="alert">
                        {formErrors.map(error => (
                            <p key={error}>{error}</p>
                        ))}
                      </div>
                    : null}
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
}

export default SignupForm;