import React, { useState, useEffect } from "react";
import JoblyApi from "../JoblyApi";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";

function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getCompanies() {
            try {
                let companies = await JoblyApi.getCompanies();
                setCompanies(companies);
            } catch (err) {
                setError("An error occurred while fetching companies.");
                console.error("API Error:", err);
            }
        }
        getCompanies();
    }, []);

    async function handleSearch(searchTerm) {
        try {
            let companies = await JoblyApi.getCompanies(searchTerm);
            setCompanies(companies);
        } catch (err) {
            setError("An error occurred while searching for companies.");
            console.error("Search Error:", err);
        }
    }

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="CompaniesList">
            <SearchBar onSearch={handleSearch} />
            {companies.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </div>
    );
}

export default CompaniesList;