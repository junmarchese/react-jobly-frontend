import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../JoblyApi";

function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        async function fetchJob() {
            try {
                const jobData = await JoblyApi.getJob(id);
                setJob(jobData);
            } catch (err) {
                console.error("Error loading job", err);
            }
        }
        fetchJob();
    }, [id]);

    if (!job) return <div>Unable to load job details. Please try again later.</div>;

    return (
        <div className="JobDetail">
            <h2>{job.title}</h2>
            <p>Company: {job.companyName}</p>
            <p>Salary: {job.salary || "N/A"}</p>
            <p>Equity: {job.equity || "N/A"}</p>
            <button className="btn btn-primary">Apply</button>
        </div>
    );
}

export default JobDetail;