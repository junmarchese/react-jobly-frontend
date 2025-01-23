import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function JobCard({ id, title, salary, equity, hasApplied, applyToJob }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const applied = currentUser && currentUser.applications.includes(id);

    async function handleApply() {
        if (applied) return;
        await applyToJob(id);
        setCurrentUser((user) => ({
            ...user,
            applications: [...user.applications, id],
        }));
    }

    return (
        <div className="JobCard" key={id}>
            <h3>
                <Link to={`/jobs/${id}`}>{title}</Link>
            </h3>
            {salary && <div>Salary: ${salary}</div>}
            {equity && <div>Equity: {equity}</div>}
            <button onClick={handleApply} disabled={applied}>
                {applied ? "APPLIED" : "APPLY"}
            </button>
        </div>
    );
}

export default JobCard;
