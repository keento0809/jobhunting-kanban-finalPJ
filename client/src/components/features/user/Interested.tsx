import React, {useEffect, useState} from 'react';
import CompanyCard from "./CompanyCard";
import {useCompanyContext} from "../../context/companyContext";
import {Company} from "../../../types/Company";
import EmptyCompany from "./EmptyCompany";

type CompaniesProps = {
    companies: Company[]
}

const Interested = ({companies}: CompaniesProps) => {

    const [filtered, setFiltered] = useState<Company[]>(companies);
    const {filteredChildren} = useCompanyContext();

    useEffect(() => {
        if (companies.length > 0 && filteredChildren.length > 0) {
            let filteredArray = companies.filter(company => company.name?.includes(filteredChildren))
            setFiltered(filteredArray)
            return
        }
        setFiltered(companies)
    }, [filteredChildren])

    return (
        <section className="interested card-container">
            {
                companies.length > 0 ?
                    filtered.map((company) =>
                        <CompanyCard
                            key={company.company_id}
                            company_id={company.company_id}
                            name={company.name}
                            location={company.location}
                            link={company.link}
                            jobtype={company.jobtype}
                            salary={company.salary}
                            description={company.description}
                            status={company.status}
                            interest={company.interest}
                            company_size={company.company_size}
                        />) : < EmptyCompany/>
            }
        </section>
    );
};

export default Interested;
