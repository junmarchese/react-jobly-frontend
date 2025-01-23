import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 


function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await login(formData);
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
        <div className="LoginForm">
            <h2>Login</h2>
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
                {formErrors && formErrors.length > 0 && (
                    <div className="alert alert-danger" role="alert">
                        {formErrors.map(error => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;