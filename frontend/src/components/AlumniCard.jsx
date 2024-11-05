import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlumniCard = ({ alumniMember }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/alumni/${alumniMember._id}`); // Navigate to the alumni details page
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img
        src={alumniMember.profileUrl || alumniMember.profilePicture} // Fallback image if no profileUrl
        alt={alumniMember.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{alumniMember.name}</h3>
        <p className="text-gray-600">Department: {alumniMember.department}</p>
        <p className="text-gray-600">Year of Graduation: {alumniMember.yearOfGraduation}</p>
        <p className="text-gray-600">Current Position: {alumniMember.currentPosition}</p>
        <p className="text-gray-600">Current Organization: {alumniMember.currentOrganization}</p>
        <button
          onClick={handleViewDetails}
          className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AlumniCard;
