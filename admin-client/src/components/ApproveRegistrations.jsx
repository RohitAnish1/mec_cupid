import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApproveRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false); // Add match loading state
  const [matchError, setMatchError] = useState(null);  // Add match error state
  const [matchSuccess, setMatchSuccess] = useState(false) // Add match success state

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/admin/pending");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err.message || "Failed to fetch registrations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await fetch(`https://mec-cupid.onrender.com/api/admin/approve/${id}`, {
        method: "PUT",
      });
      setRegistrations(registrations.filter((reg) => reg.id !== id));
    } catch (err) {
      console.error("Error approving user:", err);
      setError(err.message || "Failed to approve user.");
    }
  };

  const handleStartMatching = async () => {
        setMatchLoading(true)
        try {
          const response = await fetch("https://mec-cupid.onrender.com/api/admin/match", { method: "POST" });
        if (!response.ok) {
            const message = await response.json();
            throw new Error(`HTTP error! Status: ${response.status} - ${message.message}`);
         }
           setMatchSuccess(true)
        } catch (err) {
           setMatchError(err.message || "Error starting matching process");
           console.error("Error starting matching:", err);
        } finally {
           setMatchLoading(false)
        }
   }

  if (loading) {
    return <div>Loading registrations...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if(matchLoading) {
    return <div>Matching in progress...</div>
  }
  if(matchError){
    return <div>Match Error: {matchError}</div>
  }
   if (matchSuccess) {
       return <div>Matching successful, Please check your database for matching results</div>
   }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Approvals</h1>
      {registrations.length === 0 ? (
        <p>No pending registrations.</p>
      ) : (
        registrations.map((reg) => (
          <div key={reg.id} className="border p-4 mb-2 rounded bg-white">
            <p>
              {reg.firstName} {reg.lastName}
            </p>
            <button
              onClick={() => handleApprove(reg.id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          </div>
        ))
      )}
      <button
        onClick={handleStartMatching}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Matching
      </button>
    </div>
  );
}