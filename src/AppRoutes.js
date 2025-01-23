import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CompaniesList from "./components/CompaniesList";
import CompanyDetail from "./components/CompanyDetail";
import JobsList from "./components/JobsList";
import JobDetail from "./components/JobDetail";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";


function AppRoutes({ login, signup }) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/companies" element={
                <PrivateRoute>
                    <CompaniesList />
                </PrivateRoute>
            } />
            <Route path="/companies/:handle" element={
                <PrivateRoute>
                    <CompanyDetail />
                </PrivateRoute>
            } />
            <Route path="/jobs" element={
                <PrivateRoute>
                    <JobsList />
                </PrivateRoute>
            } />
            <Route path="/jobs/:id" element={
                <PrivateRoute>
                    <JobDetail />
                </PrivateRoute>
            } />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/profile" element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
            <Route path="/not-found" element={
                <PrivateRoute>
                    <NotFound />
                </PrivateRoute>
            } />
        </Routes> 
    );
}

export default AppRoutes;