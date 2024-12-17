import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobCard = ({job}) => {
    return (
        <div className="flex flex-col bg-blue-50 hover:bg-transparent border border-blue-800 dark:bg-gray-800 hover:shadow-lg transition-all ease-in rounded-lg overflow-hidden p-8">
            <div className="flex-1">
                <div className="flex items-center">
                    <figure className="w-12 h-12 flex-shrink-0 flex justify-center items-center rounded">
                        <img className="w-full" src={job.company_logo} alt="Company Logo" />
                    </figure>
                    <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{job.company}</h4>
                        <p className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 mr-1" />
                            {job.location || 'Location not specified'}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                        {job.title}
                        <span className="ml-2 px-2 py-1 text-sm text-white bg-green-500 rounded-md">NEW</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {job.requirements?.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-sm border border-blue-800 font-medium dark:border-blue-800 rounded dark:text-gray-300 bg-gray-50 dark:bg-blue-600 text-blue-800 dark:hover:text-white"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-6">
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaDollarSign className="mr-1 text-blue-500 dark:text-blue-400" />
                    {job.salaryRange?.min || 0} - {job.salaryRange?.max || 0} {job.salaryRange?.currency || ''}
                </p>
                <Link to={`/jobs/details/${job._id}`}>
                    <button className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                        Apply
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default JobCard
