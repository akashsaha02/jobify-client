import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaDollarSign, FaUserTie } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const JobDetails = () => {
  const job = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center py-10">
      <div className="w-full max-w-4xl bg-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-md rounded-lg p-8">
        <header className="flex items-center mb-8">
          <img
            src={job.company_logo}
            alt={job.company}
            className="h-16 w-16 mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">{job.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{job.company}</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Job Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 mr-2" />
              <span><strong>Location:</strong> {job.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaBriefcase className="text-purple-500 dark:text-purple-400 mr-2" />
              <span><strong>Job Type:</strong> {job.jobType}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaUserTie className="text-green-500 dark:text-green-400 mr-2" />
              <span><strong>Category:</strong> {job.category}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaDollarSign className="text-yellow-500 dark:text-yellow-400 mr-2" />
              <span><strong>Salary:</strong> {job.salaryRange.min}-{job.salaryRange.max} {job.salaryRange.currency}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaCalendarAlt className="text-red-500 dark:text-red-400 mr-2" />
              <span><strong>Deadline:</strong> {job.applicationDeadline}</span>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Description</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{job.description}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Responsibilities</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Requirements</h2>
          <div className="flex flex-wrap gap-2 text-blue-800 dark:text-gray-400">
            {job.requirements.map((requirement, index) => (
              <div className='border border-blue-800 bg-blue-50 dark:border-gray-300 dark:bg-gray-700 dark:text-white px-2 rounded' key={index}>{requirement}</div>
            ))}
          </div>
        </section>

        <footer className="border-t border-gray-300 dark:border-gray-600 pt-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            For inquiries, please contact <strong>{job.hr_name}</strong> at
            <a
              href={`mailto:${job.hr_email}`}
              className="text-blue-500 dark:text-blue-400 hover:underline ml-1"
            >
              {job.hr_email}
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default JobDetails;