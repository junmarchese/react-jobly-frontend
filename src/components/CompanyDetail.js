import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../JoblyApi";
import JobCard from "./JobCard";

function CompanyDetail() {
    const { handle } = useParams(); // Get company handle from URL params
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCompany() {
            try {
                setIsLoading(true);
                const companyData = await JoblyApi.getCompany(handle); // Fetch company by handle
                setCompany(companyData);
            } catch (err) {
                console.error("Error fetching company details:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCompany();
    }, [handle]);

    if (isLoading) return <p>Loading...</p>;
    if (!company) return <p>Company not found.</p>;

    return (
        <div className="CompanyDetail">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <h3>Jobs at {company.name}</h3>
            <div>
                {company.jobs.length ? (
                    company.jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity}
                            hasApplied={false} // Handle logic for applied status if necessary
                            applyToJob={() => console.log(`Apply to job ${job.id}`)} // Replace with your apply logic
                        />
                    ))
                ) : (
                    <p>No jobs available at this company.</p>
                )}
            </div>
        </div>
    );
}

export default CompanyDetail;
