import React from 'react'

const JobCard = () => {
    return (
        <div>
            <div key={job._id} className="card card-compact bg-base-100 shadow-xl">
                <div className="flex gap-2 m-2">
                    <figure>
                        <img className="w-16" src={job.company_logo} alt="Company Logo" />
                    </figure>
                    <div>
                        <h4 className="text-2xl">{job.company}</h4>
                        <p className="flex gap-1 items-center">
                            <FaMapMarkerAlt />
                            {job.location || 'Location not specified'}
                        </p>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">
                        {job.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{job.description}</p>
                    <div className="flex gap-2 flex-wrap">
                        {job.requirements?.map((skill, index) => (
                            <p
                                key={index}
                                className="border rounded-md text-center px-2 hover:text-purple-600 hover:bg-gray-400"
                            >
                                {skill}
                            </p>
                        ))}
                    </div>
                    <div className="card-actions justify-end items-center mt-4">
                        <p className="flex items-center">
                            Salary: <FaDollarSign />{' '}
                            {job.salaryRange?.min || 0} - {job.salaryRange?.max || 0}{' '}
                            {job.salaryRange?.currency || ''}
                        </p>
                        <Link to={`/jobs/${job._id}`}>
                            <button className="btn btn-primary">Apply</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobCard
