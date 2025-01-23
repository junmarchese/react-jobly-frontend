import React from "react";
import { Link } from "react-router-dom";


function CompanyCard({ company }) {
    const { handle, name, description, logoUrl } = company;
    return (
        <Link to={`/companies/${handle}`} className="CompanyCard card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                {company.logoUrl && <img src={logoUrl} alt={name} className="float-right ml-5" />}
            </div>
        </Link>
    );
}

export default CompanyCard;

