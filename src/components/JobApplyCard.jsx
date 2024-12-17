import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_URL;

const JobApplyCard = ({ app }) => {

    const [jobDetails, setJobDetails] = useState({});

    useEffect(() => {
        axios.get(`${apiBaseUrl}/jobs/${app.job_id}`).then((res) => {
            setJobDetails(res.data);
        });
    }, []);
    return (
        <div>
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <div className='p-4'>
                    {/* Applicant Info */}
                    <div className='flex items-center mb-4'>
                        <img
                            src={app.applicantPhotoURL}
                            alt={app.applicantName}
                            className='w-12 h-12 rounded-full mr-4 border-2 border-gray-300'
                        />
                        <div>
                            <h2 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                                {app.applicantName}
                            </h2>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                {app.applicantEmail}
                            </p>
                        </div>
                    </div>
                    {/* Job Details */}
                    <div className='mb-4'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
                            {jobDetails.title} at {jobDetails.company}
                        </h3>
                        <p className='text-gray-700 dark:text-gray-300'>{jobDetails.location}</p>
                    </div>
                    {/* Application Details */}
                    <div>
                        <p className='text-gray-700 dark:text-gray-300 mb-2'>
                            <span className='font-medium'>Skills:</span> {app.application.skills}
                        </p>
                        <p className='text-gray-700 dark:text-gray-300 mb-2'>
                            <span className='font-medium'>Career Summary:</span> {app.application.careerSummary}
                        </p>
                        <p className='text-gray-700 dark:text-gray-300 mb-2'>
                            <span className='font-medium'>Status:</span>{' '}
                            <span
                                className={`inline-block px-2 py-1 rounded-full text-sm text-white ${app.application.status === 'pending'
                                    ? 'bg-yellow-500'
                                    : app.application.status === 'approved'
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                    }`}
                            >
                                {app.application.status}
                            </span>
                        </p>
                    </div>
                    {/* Links */}
                    <div className='mt-4 flex gap-4 items-center'>
                        <a
                            href={app.application.portfolioLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:underline block'
                        >
                            Portfolio
                        </a>
                        <a
                            href={app.application.linkedinLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:underline block'
                        >
                            LinkedIn
                        </a>
                        <a
                            href={app.application.resumeLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:underline block'
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplyCard;