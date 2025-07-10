import React from 'react';
import './ResponseCard.css';

const ResponseCard = ({ response, onAccept }) => {
  return (
    <div className="response-card">
      <h4>Shopkeeper ID: {response.shopkeeperid}</h4>
      <p>Has Product: {response.hasproduct ? 'Yes' : 'No'}</p>
      <p>Status: {response.status}</p>
      {onAccept && response.status !== 'Accepted' && (
  <button onClick={() => onAccept(response._id)}>Accept</button>
)}

    </div>
  );
};

export default ResponseCard;
