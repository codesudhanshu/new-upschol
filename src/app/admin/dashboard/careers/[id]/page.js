"use client";
import { getAllApplications } from "@/app/api/admin/apiService";
import { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getAllApplications(id);
      if (data.status && data.result) {
        setApplications(data.result.applications || []);
      }
    } catch (err) {
      setError("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Job Position</th>
              <th className="py-2 px-4 border-b">Applied Date</th>
              <th className="py-2 px-4 border-b">Resume</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="py-2 px-4 border-b">{app.name}</td>
                <td className="py-2 px-4 border-b">{app.email}</td>
                <td className="py-2 px-4 border-b">{app.job_position}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <a 
                    href={app.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <select 
                    value={app.status}
                    onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}