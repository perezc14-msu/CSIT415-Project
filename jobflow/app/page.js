'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./styles/globals.css";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ company: '', position: '', status: '', appliedDate: '' });
  const [userID, setUserID] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term
  
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        if (!data.userId) {
          router.push('/login');
        } else {
          setUserID(data.userId);
          fetchJobs();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { company, position, status, appliedDate } = formData;
  
    if (!company || !position || !status || !appliedDate) {
      alert('Please fill all fields');
      return;
    }
  
    const jobData = { company, position, status, applied_date: appliedDate, user_id: userID };
    const url = editingJobId ? `/api/jobs/${editingJobId}` : '/api/jobs';
    const method = editingJobId ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
  
      const data = await response.json();
      if (data.success) {
        alert(`Job ${editingJobId ? 'updated' : 'added'} successfully`);
  
        // If updating an existing job, update the job in the state
        if (editingJobId) {
          setJobs(jobs.map(job => 
            job.id === editingJobId ? { ...job, ...jobData } : job
          ));
        } else {
          setJobs([data.job, ...jobs]);
        }
  
        resetForm();
      } else {
        alert('Operation failed');
      }
    } catch (error) {
      console.error("Error handling job:", error);
    }
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.id);
    setFormData({ company: job.company, position: job.position, status: job.status, appliedDate: job.applied_date });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete job');
      alert('Job deleted successfully');
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('An error occurred while deleting the job.');
    }
  };

  const resetForm = () => {
    setFormData({ company: '', position: '', status: '', appliedDate: '' });
    setEditingJobId(null);
    setShowForm(false);
  };

  const filteredJobs = jobs.filter(job => {
    // Filter by company, position, or status
    return (
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="jobs-page">
      <h1>Your Jobs</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Company, Role, or Status"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : editingJobId ? 'Cancel Edit' : 'Add New Job'}
      </button>

      {showForm && (
        <form className="job-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="company" 
            placeholder="Company" 
            value={formData.company} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="position" 
            placeholder="Position" 
            value={formData.position} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="status" 
            placeholder="Status" 
            value={formData.status} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="date" 
            name="appliedDate" 
            value={formData.appliedDate} 
            onChange={handleInputChange} 
            required 
          />
          <button id="addJob" type="submit">{editingJobId ? 'Update Job' : 'Add Job'}</button>
        </form>
      )}

      {filteredJobs.length > 0 && filteredJobs.map((job, index) => (
        <div key={job.id} className="job-table-container">
          <h2>Job {index + 1}</h2>
          <table className="job-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>{job.status}</td>
                <td>{job.applied_date}</td>
                <td>
                  <button onClick={() => handleEditJob(job)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(job.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
