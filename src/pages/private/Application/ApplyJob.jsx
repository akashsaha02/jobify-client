import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../providers/AuthProvider';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const ApplyJob = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const jobInfo = useLoaderData()

    console.log(jobInfo)

    const [formData, setFormData] = useState({
        careerSummary: '',
        skills: '',
        portfolioLink: '',
        linkedinLink: '',
        resumeLink: '',
        readyToRelocate: false,
        skillsAligned: false,
        resolveResponsibilities: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const applicationData = {
            applicantName: user.displayName,
            applicantEmail: user.email,
            applicantPhotoURL: user.photoURL,
            job_id: jobInfo._id,
            application: {
                careerSummary: formData.careerSummary,
                skills: formData.skills,
                portfolioLink: formData.portfolioLink,
                linkedinLink: formData.linkedinLink,
                resumeLink: formData.resumeLink,
                readyToRelocate: formData.readyToRelocate,
                skillsAligned: formData.skillsAligned,
                resolveResponsibilities: formData.resolveResponsibilities,
                submitted_At: new Date().toISOString(),
                status: 'pending',
            },

        };
        console.log(applicationData);

        axios
            .post(`${apiBaseUrl}/applications`, applicationData)
            .then(() => {
                toast.success('Application submitted successfully!');
                navigate('/jobs');
            })
            .catch((error) => {
                console.error('Error submitting application:', error);
                toast.error('Failed to submit application.');
            });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Apply for {jobInfo.title} at <span className="text-blue-500 text-3xl">{jobInfo.company}</span>
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                    <input
                        type="text"
                        value={user.displayName}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Career Summary</label>
                    <textarea
                        name="careerSummary"
                        value={formData.careerSummary}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring dark:bg-gray-700 dark:text-gray-200"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Comma-separated skills"
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Portfolio Link</label>
                    <input
                        type="url"
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    />
                </div><div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Linked In Link</label>
                    <input
                        type="url"
                        name="linkedinLink"
                        value={formData.linkedinLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    />
                </div><div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Resume Link</label>
                    <input
                        type="url"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="readyToRelocate"
                            checked={formData.readyToRelocate}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-200">Ready to work on preferred location</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="skillsAligned"
                            checked={formData.skillsAligned}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-200">My skills align with job requirements</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="resolveResponsibilities"
                            checked={formData.resolveResponsibilities}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-200">
                            I believe I can resolve all the job responsibilities
                        </span>
                    </label>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg focus:outline-none focus:ring"
                    >
                        Apply Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyJob;
