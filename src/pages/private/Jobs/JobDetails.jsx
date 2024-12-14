import { useLoaderData } from 'react-router-dom';

const JobDetails = () => {
  const data = useLoaderData();

  return (
    <div>
      job details hi
      {data ? (
        <>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>Location: {data.location}</p>
          <p>Salary: {data.salaryRange.min} - {data.salaryRange.max} {data.salaryRange.currency}</p>
          <p>Company: {data.company}</p>
          <p>Requirements: {data.requirements.join(', ')}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobDetails;