import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "./App.css";

const API_URL = "https://jobtrack-backend-8z23.onrender.com/api/jobs";

const chartColors = ["#6258E8", "#10B981", "#F59E0B", "#EF4444"];

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Internship",
  "Remote",
  "Contract",
];

// Dashboard chart data
const getStatusData = (jobs) => {
  return STATUSES.map((status) => ({
    name: status,
    value: jobs.filter(
      (job) =>
        (job.status || "Applied").toLowerCase() ===
        status.toLowerCase()
    ).length,
  }));
};

function App() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingJob, setEditingJob] = useState(null);

  // Local date in YYYY-MM-DD format
  function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Initial form values
  function createInitialForm() {
    return {
      company: "",
      role: "",
      location: "",
      status: "Applied",
      jobType: "Full-time",
      appliedDate: getTodayDate(),
      jobUrl: "",
      notes: "",
    };
  }

  const [form, setForm] = useState(createInitialForm);

  // Fetch applications from backend
  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

const response = await axios.get(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setJobs(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load applications. Please check the backend server and API connection."
      );
    } finally {
      setLoading(false);
    }
  }

  // Load applications when the component opens
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  // Open add application form
  function openAddForm() {
    setEditingJob(null);

    setForm(createInitialForm());

    setError("");

    setShowForm(true);
  }

  // Close form
  function closeForm() {
    setShowForm(false);

    setEditingJob(null);

    setForm(createInitialForm());
  }

  // Add or update application
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

if (editingJob) {
  await axios.put(
    `${API_URL}/${editingJob._id}`,
    form,
    config
  );
} else {
  await axios.post(
    API_URL,
    form,
    config
  );
}

      closeForm();

      await fetchJobs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save the application. Please check the backend server and database connection."
      );
    }
  }

  // Edit application
  function startEdit(job) {
    setEditingJob(job);

    let appliedDate = "";

    if (job.appliedDate) {
      const date = new Date(job.appliedDate);

      if (!Number.isNaN(date.getTime())) {
        appliedDate = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-");
      }
    }

    setForm({
      company: job.company || "",
      role: job.role || "",
      location: job.location || "",
      status: job.status || "Applied",
      jobType: job.jobType || "Full-time",
      appliedDate,
      jobUrl: job.jobUrl || "",
      notes: job.notes || "",
    });

    setError("");

    setShowForm(true);
  }

  // Delete application
  async function deleteJob(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

await axios.delete(`${API_URL}/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      await fetchJobs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete the application. Please try again."
      );
    }
  }

  // Search and filter applications
  const filteredJobs = jobs.filter((job) => {
    const searchableText = `
      ${job.company || ""}
      ${job.role || ""}
      ${job.location || ""}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(
      search.toLowerCase()
    );

    const matchesStatus =
      statusFilter === "All" ||
      (job.status || "Applied") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count applications by status
  function countByStatus(status) {
    return jobs.filter(
      (job) =>
        (job.status || "Applied").toLowerCase() ===
        status.toLowerCase()
    ).length;
  }

  // Data for status pie chart
  const statusData = getStatusData(jobs);

  // Data for job type bar chart
  const jobTypeData = JOB_TYPES.map((type) => ({
    name: type,

    total: jobs.filter(
      (job) => job.jobType === type
    ).length,
  }));

  // Format date for the table
  function formatAppliedDate(value) {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-GB");
  }

  return (
    <div className="app-shell">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <span className="brand-icon">J</span>

          <span>JobTrack</span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <button
          className="nav-item active"
          type="button"
        >
          ▦ &nbsp; Dashboard
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={openAddForm}
        >
          ＋ &nbsp; Add Application
        </button>

        <div className="sidebar-bottom">

          <div className="profile-avatar">U</div>

          <div>
  <strong>Job Seeker</strong>
  <small>My Workspace</small>
</div>
</div>

<button
  type="button"
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  style={{
    width: "100%",
    marginTop: "16px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#b91c1c",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Logout
</button>
</aside>

      {/* Main Dashboard */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">

          <div>
            <p className="eyebrow">
              YOUR CAREER WORKSPACE
            </p>

            <h1>Job Applications</h1>

            <p className="subtitle">
              Track your applications and take the next step in your career.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={openAddForm}
          >
            + Add Application
          </button>

        </header>

        {/* Error message */}
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <section className="stats-grid">

          <div className="stat-card">

            <span className="stat-label">
              Total Applications
            </span>

            <strong>{jobs.length}</strong>

            <span className="stat-note">
              All tracked applications
            </span>

          </div>

          <div className="stat-card">

            <span className="stat-label">
              Applied
            </span>

            <strong>{countByStatus("Applied")}</strong>

            <span className="stat-note">
              Waiting for a response
            </span>

          </div>

          <div className="stat-card">

            <span className="stat-label">
              Interviews
            </span>

            <strong>{countByStatus("Interview")}</strong>

            <span className="stat-note">
              Opportunities in progress
            </span>

          </div>

          <div className="stat-card">

            <span className="stat-label">
              Offers
            </span>

            <strong>{countByStatus("Offer")}</strong>

            <span className="stat-note">
              Offers received
            </span>

          </div>

        </section>

        {/* Dashboard Charts */}
        <section className="charts-grid">

          {/* Pie Chart */}
          <div className="chart-card">

            <h2>Applications by Status</h2>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={88}
                  label
                >

                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        chartColors[
                          index % chartColors.length
                        ]
                      }
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

          {/* Bar Chart */}
          <div className="chart-card">

            <h2>Applications by Job Type</h2>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart
                data={jobTypeData}
                margin={{
                  top: 8,
                  right: 12,
                  left: -18,
                  bottom: 12,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={62}
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="total"
                  name="Applications"
                  fill="#6258E8"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </section>

        {/* Applications Table */}
        <section className="applications-panel">

          <div className="panel-heading">

            <div>
              <h2>Recent Applications</h2>

              <p>
                Manage and review your job search progress.
              </p>
            </div>

            <span className="application-count">
              {filteredJobs.length} applications
            </span>

          </div>

          {/* Search and Status Filter */}
          <div className="toolbar">

            <input
              className="search-input"
              type="search"
              placeholder="Search company, role or location..."
              aria-label="Search applications"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <select
              className="filter-select"
              aria-label="Filter by application status"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >

              <option value="All">
                All statuses
              </option>

              {STATUSES.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}

            </select>

          </div>

          {/* Loading State */}
          {loading ? (

            <div className="empty-state">
              Loading applications...
            </div>

          ) : filteredJobs.length === 0 ? (

            /* Empty State */
            <div className="empty-state">

              <div className="empty-icon">▤</div>

              <h3>No applications found</h3>

              <p>
                Add your first job or change the search filters.
              </p>

              <button
                className="primary-button"
                type="button"
                onClick={openAddForm}
              >
                + Add your first application
              </button>

            </div>

          ) : (

            /* Applications Table */
            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>COMPANY &amp; ROLE</th>

                    <th>LOCATION</th>

                    <th>JOB TYPE</th>

                    <th>APPLIED DATE</th>

                    <th>STATUS</th>

                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredJobs.map((job) => (

                    <tr key={job._id}>

                      {/* Company and Role */}
                      <td>

                        <div className="company-cell">

                          <div className="company-avatar">
                            {(job.company || "?")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {job.company || "Unnamed company"}
                            </strong>

                            <span>
                              {job.role || "—"}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Location */}
                      <td>
                        {job.location || "—"}
                      </td>

                      {/* Job Type */}
                      <td>
                        {job.jobType || "—"}
                      </td>

                      {/* Applied Date */}
                      <td>
                        {formatAppliedDate(job.appliedDate)}
                      </td>

                      {/* Status */}
                      <td>

                        <span
                          className={`status-badge ${
                            (job.status || "Applied")
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                          }`}
                        >
                          {job.status || "Applied"}
                        </span>

                      </td>

                      {/* Actions */}
                      <td>

                        <div className="action-buttons">

                          <button
                            className="text-button"
                            type="button"
                            onClick={() => startEdit(job)}
                          >
                            Edit
                          </button>

                          <button
                            className="text-button delete-button"
                            type="button"
                            onClick={() => deleteJob(job._id)}
                          >
                            Delete
                          </button>

                          {job.jobUrl && (

                            <a
                              className="text-button"
                              href={job.jobUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Link
                            </a>

                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* Add/Edit Application Modal */}
        {showForm && (

          <div
            className="modal-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeForm();
              }
            }}
          >

            <section
              className="job-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="form-title"
            >

              {/* Modal Header */}
              <div className="modal-heading">

                <div>

                  <h2 id="form-title">
                    {editingJob
                      ? "Edit Application"
                      : "Add Application"}
                  </h2>

                  <p>
                    Enter the details of the job opportunity.
                  </p>

                </div>

                <button
                  className="close-button"
                  type="button"
                  onClick={closeForm}
                  aria-label="Close form"
                >
                  ×
                </button>

              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit}>

                <div className="form-grid">

                  {/* Company */}
                  <label>
                    Company *

                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. TCS"
                      required
                    />
                  </label>

                  {/* Job Role */}
                  <label>
                    Job Role *

                    <input
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="e.g. Software Developer"
                      required
                    />
                  </label>

                  {/* Location */}
                  <label>
                    Location

                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Noida"
                    />
                  </label>

                  {/* Job Type */}
                  <label>
                    Job Type

                    <select
                      name="jobType"
                      value={form.jobType}
                      onChange={handleChange}
                    >

                      {JOB_TYPES.map((type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}

                    </select>
                  </label>

                  {/* Applied Date */}
                  <label>
                    Applied Date

                    <input
                      type="date"
                      name="appliedDate"
                      value={form.appliedDate || ""}
                      onChange={handleChange}
                    />
                  </label>

                  {/* Application Status */}
                  <label>
                    Application Status

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >

                      {STATUSES.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}

                    </select>
                  </label>

                  {/* Job URL */}
                  <label>
                    Job URL

                    <input
                      name="jobUrl"
                      type="url"
                      value={form.jobUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </label>

                  {/* Notes */}
                  <label className="full-width">
                    Notes

                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Recruiter details, interview date, or other notes..."
                      rows={3}
                    />
                  </label>

                </div>

                {/* Form Buttons */}
                <div className="form-actions">

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    {editingJob
                      ? "Save Changes"
                      : "Save Application"}
                  </button>

                </div>

              </form>

            </section>

          </div>

        )}

      </main>

    </div>
  );
}

export default App;