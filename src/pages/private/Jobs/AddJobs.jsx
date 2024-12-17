import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_URL;
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../components/SectionTitle';

const AddJobs = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { job, editing } = location.state || {};

    const [formData, setFormData] = useState({
        title: '',
        jobType: 'Full Time',
        category: '',
        description: '',
        company: '',
        location: '',
        salaryRange: {
            min: "",
            max: "",
            currency: 'BDT'
        },
        applicationDeadline: ''|| new Date().toISOString().split('T')[0],
        requirements: '',
        responsibilities: '',
        hr_email: user?.email || '',
        hr_name: user?.displayName || '',
        company_logo: '',
    });

    useEffect(() => {
        if (editing && job) {
            setFormData({
                ...job,
                requirements: job.requirements.join(', '),
                responsibilities: job.responsibilities.join(', '),
            });
        }
    }, [editing, job]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested salaryRange fields
        if (name.startsWith("salaryRange.")) {
            const field = name.split(".")[1]; // Extract the field name after "salaryRange."
            setFormData((prevData) => ({
                ...prevData,
                salaryRange: {
                    ...prevData.salaryRange,
                    [field]: value, // Update the specific field
                },
            }));
        } else {
            // Handle other fields
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            ...formData,
            requirements: formData.requirements.split(',').map((item) => item.trim()),
            responsibilities: formData.responsibilities.split(',').map((item) => item.trim()),
        };

        try {
            let response;
            if (editing) {
                response = await axios.put(`${apiBaseUrl}/jobs/${job._id}`, jobData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                response = await axios.post(`${apiBaseUrl}/jobs`, jobData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            if (response.status === 200) {
                toast.success(`Job ${editing ? 'updated' : 'added'} successfully!`);
                navigate('/jobs');
            } else {
                throw new Error(`Failed to ${editing ? 'update' : 'add'} job.`);
            }
        } catch (error) {
            toast.error(`Error ${editing ? 'updating' : 'adding'} job: ${error.message}`);
        }
    };

    return (
        <div className="dark:bg-gray-900 min-h-screen py-10">
            <Helmet>
                <title>{editing ? 'Edit Job' : 'Add Job'}</title>
            </Helmet>
            <div className="max-w-4xl mx-auto px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <SectionTitle title={editing ? 'Edit Job' : 'Add New Job'} subtitle={editing ? 'Update the job listing' : 'Create a new job listing'} />
                <form className="mt-6" onSubmit={handleSubmit}>
                    {/* Company Logo */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Company Logo URL</label>
                        <input
                            type="url"
                            name="company_logo"
                            value={formData.company_logo}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter company logo URL"
                        />
                    </div>
                    {/* Company Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Company Name</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter company name"
                        />
                    </div>
                    {/* Job Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter job title"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Job Type */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-200">Job Type</label>
                            <select
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Intern">Intern</option>
                                <option value="Contractual">Contractual</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-200">Job Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="Enter job category"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Job Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter job description"
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter job location"
                        />
                    </div>

                    {/* Salary Range */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Salary Range</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="salaryRange.min"
                                value={formData.salaryRange.min}
                                onChange={handleChange}
                                required
                                className="w-1/3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="Min Salary"
                            />
                            <input
                                type="number"
                                name="salaryRange.max"
                                value={formData.salaryRange.max}
                                onChange={handleChange}
                                required
                                className="w-1/3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                placeholder="Max Salary"
                            />
                            <select
                                name="salaryRange.currency"
                                value={formData.salaryRange.currency}
                                onChange={handleChange}
                                className="w-1/3 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            >
                                <option value="BDT">BDT</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="INR">INR</option>
                            </select>
                        </div>
                    </div>

                    {/* Application Deadline */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Application Deadline</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Requirements</label>
                        <input
                            type="text"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter requirements separated by commas"
                        />
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Responsibilities</label>
                        <input
                            type="text"
                            name="responsibilities"
                            value={formData.responsibilities}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter responsibilities separated by commas"
                        />
                    </div>
                    {/* HR Details */}

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">HR Name</label>
                        <input
                            type="text"
                            name="hr_name"
                            value={formData.hr_name}
                            onChange={handleChange}
                            required
                            className=" read-only w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter HR name"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">HR Email</label>
                        <input
                            type="email"
                            name="hr_email"
                            value={formData.hr_email}
                            onChange={handleChange}
                            required
                            className=" read-only: w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter HR email"
                            readOnly
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 focus:outline-none"
                    >
                        {editing ? 'Update Job' : 'Add Job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddJobs;