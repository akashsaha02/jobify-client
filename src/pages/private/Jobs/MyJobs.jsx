import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle';
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import JobTable from '../../../components/JobTable';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // Fetch jobs
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/jobs`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [email]);

  // Edit Handler
  const handleEdit = (job) => {
    navigate('/add-jobs', { state: { job, editing: true } });
  };

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiBaseUrl}/jobs/${id}`)
          .then(() => {
            toast.success('Job deleted successfully');
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
          })
          .catch(() => toast.error('Failed to delete the job. Please try again.'));
      }
    });
  };

  // Table Columns
  const columns = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'jobType', header: 'Job Type' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'location', header: 'Location' },
    {
      accessorKey: 'applicationDeadline',
      header: 'Deadline',
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    },
    { id: 'actions', header: 'Actions' },
  ];

  // Table Instance
  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <SectionTitle title="My Job Posts" subtitle="My Added Jobs" />
      </div>
      <JobTable table={table} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default MyJobs;
