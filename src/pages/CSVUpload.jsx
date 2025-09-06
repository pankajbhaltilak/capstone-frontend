import React, { useState, useEffect } from "react";
import { uploadCSV, getCsvLogs } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const CSVUpload = () => {
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logLoading, setLogLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Fetch upload logs
  const fetchLogs = async () => {
    setLogLoading(true);
    try {
      const data = await getCsvLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLogLoading(false);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file before uploading.");

    setLoading(true);
    try {
      const res = await uploadCSV(file);
      setSuccess(
        `${res.success_count} / ${res.total_rows} rows processed successfully`
      );
      setFile(null);

      // Refresh logs after successful upload
      fetchLogs();
    } catch (err) {
      setSuccess(null);
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Pagination logic
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  return (
    <div className="container mt-5">
      {/* Upload Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h3 className="mb-4 text-center text-primary">📂 CSV File Upload</h3>

          {/* File Input */}
          <div className="mb-3">
            <label className="form-label fw-bold">Choose CSV File</label>
            <input
              type="file"
              className="form-control"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>

          {/* Upload Button */}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary px-4"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Uploading...
                </>
              ) : (
                "Upload File"
              )}
            </button>
          </div>

          {/* Success Alert */}
          {success && (
            <div className="alert alert-success mt-3 text-center">{success}</div>
          )}
        </div>
      </div>

      {/* Logs Section */}
      <div className="card mt-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3 text-primary">📜 Upload Logs</h5>

          {logLoading ? (
            <div className="text-center py-3">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2rem", height: "2rem" }}
              ></div>
              <p className="mt-2">Loading logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <p className="text-muted text-center">No logs available yet.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>Uploaded By</th>
                      <th>Upload Date</th>
                      <th>Row Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLogs.map((log, index) => (
                      <tr key={log.id}>
                        <td>{indexOfFirstLog + index + 1}</td>
                        <td>{log.file_name}</td>
                        <td>{log.user}</td>
                        <td>{new Date(log.upload_time).toLocaleString()}</td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {log.row_count}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 && "active"}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages && "disabled"
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVUpload;
