import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import JoblyApi from "../JoblyApi";
import UserContext from "../UserContext";

function JobsList() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch jobs on initial render or when search is performed
    useEffect(() => {
        fetchJobs("");
    }, []);

    /** Fetch jobs from API based on search term */
    async function fetchJobs(searchTerm) {
        try {
            setIsLoading(true);
            const jobs = await JoblyApi.getJobs(searchTerm);
            setJobs(jobs);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setIsLoading(false);
        }
    }

    /** Handle job application */
    async function applyToJob(jobId) {
        try {
            await JoblyApi.applyToJob(jobId);
            setCurrentUser((user) => ({
                ...user,
                applications: [...user.applications, jobId],
            }));
        } catch (err) {
            console.error("Error applying to job:", err);
        }
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="JobsList">
            <h1>Jobs</h1>
            <SearchBar onSearch={fetchJobs} />
            <div>
                {jobs.length ? (
                    jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity}
                            hasApplied={currentUser.applications.includes(job.id)}
                            applyToJob={applyToJob}
                        />
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
}

export default JobsList;
