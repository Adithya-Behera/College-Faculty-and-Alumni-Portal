import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyCard = ({ facultyMember }) => {
  const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/faculty/${facultyMember._id}`);
    };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img
        src={facultyMember.profileUrl || 'default-profile.png'} // Fallback image if no profileUrl
        alt={facultyMember.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{facultyMember.name}</h3>
        <p className="text-gray-600">Department: {facultyMember.department}</p>
        <p className="text-gray-600">Position: {facultyMember.position}</p>
        <p className="text-gray-600">Research Statement: {facultyMember.researchStatement}</p>
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

export default FacultyCard;
