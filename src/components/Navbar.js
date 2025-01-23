import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

function Navbar({ logout }) {
    const { currentUser } = useContext(UserContext);

    return (
        <nav className="Navbar">
            <Link to="/" className="navbar-brand">Jobly</Link>
            <div className="navbar-nav">
                {currentUser ? (
                    <>
                        <NavLink to="/companies" className="Navbar-link">Companies</NavLink>
                        <NavLink to="/jobs" className="Navbar-link">Jobs</NavLink>
                        <NavLink to="/profile" className="Navbar-link">Profile</NavLink>
                        <Link to="/" onClick={logout} className="Navbar-logout">Logout {currentUser.username}</Link>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="Navbar-link">Login</NavLink>
                        <NavLink to="/signup" className="Navbar-link">Signup</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;