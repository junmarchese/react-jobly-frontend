import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";


function HomePage() {
    const { currentUser, isNewUser } = useContext(UserContext);

    return (
        <div className="Homepage">
            <h1>Jobly</h1>
            {currentUser ? (
                <h2>
                    {isNewUser
                        ? `Welcome, ${currentUser.firstName}!`
                        : `Welcome back, ${currentUser.firstName}!`
                    }
                </h2>
            )   :   (
                <div>
                    <p>All the jobs in one, convenient place.</p>
                    <Link to="/login" className="btn btn-primary">Log In</Link>
                    <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
                </div>
            )}
        </div>
    );
}

export default HomePage;