import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/jobs`)
      .then((response) => {
        const receivedData = response.data.filter(
          (item) => item.hr_email === email
        );
        setJobs(receivedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [email]);

  const handleEdit = (job) => {
    navigate('/add-jobs', { state: { job, editing: true } });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiBaseUrl}/jobs/${id}`)
      .then((response) => {
        toast.success('Job deleted successfully',response);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting job: ", error);
      });
  };

  return (
    <div className='container mx-auto px-4 '>
      myjobs
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobs.map((job) => (
          <div key={job._id} className='bg-white shadow-md rounded-md p-4'>
            <h2 className='text-lg font-semibold'>{job.title}</h2>
            <button onClick={() => handleEdit(job)} className="btn btn-primary mt-2">Edit</button>
            <button onClick={() => handleDelete(job._id)} className="btn btn-danger mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;