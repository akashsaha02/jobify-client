import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../providers/AuthProvider'
import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
import { Helmet } from 'react-helmet'
import SectionTitle from '../../../components/SectionTitle'


const AddJobs = () => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        type: "Full Time",
        description: "",
        minDonation: "",
        deadline: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${apiBaseUrl}/campaigns`,
                {
                    ...formData,
                    userEmail: user.email,
                    userName: user.displayName,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 200) {
                toast.success("Campaign added successfully!");
                navigate("/campaigns");
            } else {
                throw new Error("Failed to add campaign.");
            }
        } catch (error) {
            toast.error("Error adding campaign:", error.message);
            toast.error("Something went wrong. Please try again.");
        }
    }


    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <Helmet>
                <title>CrowdHex | Add Campaign</title>
            </Helmet>
            <div className="max-w-4xl mx-auto mt-10 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <SectionTitle title="Add New Job" subtitle={`Welcome`} />
                <form className="mt-6" onSubmit={handleSubmit}>
                    {/* Image URL */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter image URL"
                        />
                    </div>

                    {/* Campaign Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter job title"
                        />
                    </div>

                    {/* Campaign Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Job Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Intern">Intern</option>
                            <option value="Contraactual">Contraactual</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Job Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter job description"
                        />
                    </div>

                    {/* Minimum Donation Amount */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Salary Range</label>
                        <input
                            type="number"
                            name="minDonation"
                            value={formData.minDonation}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter minimum donation amount"
                        />
                    </div>

                    {/* Deadline */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>

                    {/* User Email (Read Only) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">User Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                        />
                    </div>

                    {/* User Name (Read Only) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">User Name</label>
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-teal-600 dark:bg-teal-500 text-white font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-teal-600 focus:outline-none"
                    >
                        Add Campaign
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddJobs
