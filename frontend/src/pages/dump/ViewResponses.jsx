import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/api';
import './ViewResponses.css';
import ResponseCard from '../../components/ResponseCard';

const ViewResponses = () => {
  const { requestId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`/api/responses/${requestId}`);
        console.log("Fetched responses:", res.data); // 👈 add this
        console.log("Request ID:", requestId); // 👈 add this
        console.log("Response ID:", res.data._id); // 👈 add this
        console.log("nhi hai");
        setResponses(res.data);
      } catch (err) {
        console.error('Error fetching responses:', err);
      }
    };
    fetchResponses();
  }, [requestId]);

  const handleAccept = async (responseId) => {
    try {
      await axios.put(`/api/responses/accept/${responseId}`);
      setResponses((prev) =>
        prev.map((r) => (r._id === responseId ? { ...r, status: 'accepted' } : r))
      );
    } catch (err) {
      alert('Error accepting response');
      console.error(err);
    }
  };

  return (
    <div className="view-responses">
      <h2>Responses</h2>
      {responses.map((res) => (
        <ResponseCard key={res._id} response={res} onAccept={handleAccept} />
      ))}
    </div>
  );
};

export default ViewResponses;
