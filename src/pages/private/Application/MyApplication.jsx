import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
const apiBaseUrl = import.meta.env.VITE_API_URL;
import { AuthContext } from '../../../providers/AuthProvider';
import JobApplyCard from '../../../components/JobApplyCard';

const MyApplication = () => {
  const [myApplications, setMyApplications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/applications/?email=${user.email}`).then((res) => {
      setMyApplications(res.data);
    });
  }, [user.email]);

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6'>
        My Applications ({myApplications.length})
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {myApplications.map((app) => (
          <JobApplyCard key={app._id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default MyApplication;