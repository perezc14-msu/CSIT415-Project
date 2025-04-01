'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./jobs.css";
import { FaFilter } from 'react-icons/fa';

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ company: '', position: '', status: 'Applied', appliedDate: '', location: '', interviewDate: '' });
  const [userID, setUserID] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ company: '', status: '', position: '' });

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
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { company, position, status, appliedDate, location, interviewDate } = formData;

    if (!company || !position || !status || !appliedDate || !location || !interviewDate) {
      alert('Please fill all fields');
      return;
    }

    const jobData = { company, position, status, applied_date: appliedDate, location, interview_date: interviewDate, user_id: userID };
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
    setFormData({ company: job.company, position: job.position, status: job.status, appliedDate: job.applied_date ,  location: job.location,
      interviewDate: job.interview_date});
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
    setFormData({ company: '', position: '', status: 'Applied', appliedDate: '', location: '', interviewDate: '' });
    setEditingJobId(null);
    setShowForm(false);
  };

  const applyFilters = () => {
    setShowFilters(false); // Close the filter dropdown after applying
  };

  const clearFilters = () => {
    setFilters({ company: '', status: '', position: '' });
    setShowFilters(false); // Close the filter dropdown after clearing
  };

  const filteredJobs = jobs.filter(job => {
    return (
      job.company.toLowerCase().includes(filters.company.toLowerCase()) &&
      job.status.toLowerCase().includes(filters.status.toLowerCase()) &&
      job.position.toLowerCase().includes(filters.position.toLowerCase()) &&
      (job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="jobs-page">
      {/* Header with Search Bar and Filter Icon */}
      <header className="header">
        <h1>Your Jobs</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search by Company, Role, or Status"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter />
          </button>
          {showFilters && (
            <div className="filter-dropdown">
              <input
                type="text"
                name="company"
                placeholder="Filter by Company"
                value={filters.company}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="position"
                placeholder="Filter by Position"
                value={filters.position}
                onChange={handleFilterChange}
              />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <div className="filter-actions">
                <button onClick={clearFilters}>Clear</button>
                <button onClick={applyFilters}>Apply</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Job List in Table Format */}
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          <table className="job-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Interview Date</th>
                <th>Actions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.company}</td>
                  <td>{job.position}</td>
                  <td>{job.status}</td>
                  <td>{job.applied_date}</td>
                  <td>{job.location}</td>
                  <td>{job.interview_date}</td>
                  <td>
                    <button onClick={() => handleEditJob(job)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(job.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {/*  (FAB) */}
      <button className="fab" onClick={() => setShowForm(!showForm)}>
        {showForm ? '×' : '+'}
      </button>

      {/* Text */}
      <footer className="footer">
        <p>© 2025 JobFlow. All rights reserved.</p>
      </footer>

      {/* Job Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingJobId ? 'Edit Job' : 'Add New Job'}</h2>
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
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <input 
                type="date" 
                name="appliedDate" 
                value={formData.appliedDate} 
                onChange={handleInputChange} 
                required 
              />
              <input 
                type="text" 
                name="location" 
                placeholder="Location" 
                value={formData.location} 
                onChange={handleInputChange} 
                required 
              />
              <input 
                type="date" 
                name="interviewDate" 
                value={formData.interviewDate} 
                onChange={handleInputChange} 
                required 
              />
              <button id="addJob" type="submit">{editingJobId ? 'Update Job' : 'Add Job'}</button>
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
              Enter URL: 
              <input type="text" name="urlLink" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}