import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SectionTitle from '../../../components/SectionTitle';
import JobCard from '../../../components/JobCard';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const Alljobs = () => {
    const [allJobs, setAllJobs] = useState([]);

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/jobs`)
            .then((response) => {
                setAllJobs(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // Only run once on component mount

    return (
        <div className="container mx-auto px-4">
            <div className="my-8">
                <SectionTitle title={`All Jobs (${allJobs.length})`} subtitle="Find your dream job" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default Alljobs;
