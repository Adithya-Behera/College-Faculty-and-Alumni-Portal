import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlumniDetail, deleteAlumni } from "../redux/alumniSlice"; // Assuming you have a similar slice for alumni
import { useParams, useNavigate } from "react-router-dom";

const AlumniDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { alumniDetail, loading, error, successMessage } = useSelector(
    (state) => state.alumni // Adjust this based on your Redux store structure
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchAlumniDetail(id)); // Dispatch the fetch action on mount
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this alumni member?")) {
      dispatch(deleteAlumni(id));
      navigate("/alumni"); // Redirect to alumni list after deletion
    }
  };

  const handleUpdate = () => {
    navigate(`/updateAlumni/${id}`); // Navigate to the update form
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {alumniDetail ? (
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {(alumniDetail.profileUrl || alumniDetail.profilePicture) && (
            <img
              src={alumniDetail.profileUrl || alumniDetail.profilePicture}
              alt={`${alumniDetail.name}'s profile`}
              className="w-60 h-60 rounded-full shadow-md mb-4"
            />
          )}

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {alumniDetail.name}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>Department:</strong> {alumniDetail.department}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Email:</strong> {alumniDetail.email}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Contact:</strong> {alumniDetail.contact}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Year of Graduation:</strong> {alumniDetail.yearOfGraduation}
          </p>

          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">Bio:</h2>
            <p className="text-gray-600">{alumniDetail.bio}</p>
            <h2 className="text-xl font-medium text-gray-700">
              Current Position:
            </h2>
            <p className="text-gray-600">{alumniDetail.currentPosition}</p>
            <h2 className="text-xl font-medium text-gray-700 mt-2">
              Current Organization
            </h2>
            <p className="text-gray-600">{alumniDetail.currentOrganization}</p>
            <h2 className="text-xl font-medium text-gray-700 mt-2">Location</h2>
            <p className="text-gray-600">{alumniDetail.location}</p>
          </div>
          {/* Interests */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">Interests:</h2>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
              {alumniDetail.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">Skills:</h2>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
              {alumniDetail.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">Projects:</h2>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
              {alumniDetail.projects.map((project) => (
                <li key={project._id}>
                  {" "}
                  {/* Use a unique identifier for the key */}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      <strong>{project.title}</strong>
                    </a>
                  ) : (
                    <strong>{project.title}</strong> // Just display title if no link
                  )}
                  {project.description && <span>: {project.description}</span>}{" "}
                  {/* Only display description if it exists */}
                </li>
              ))}
            </ul>
          </div>

          {/* Availability for Mentorship */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">
              Availability for Mentorship:
            </h2>
            <p className="text-gray-600">
              {alumniDetail.availabilityForMentorship
                ? "Available"
                : "Not Available"}
            </p>
          </div>

          {/* Admin options for updating and deleting */}
          {isAuthenticated && (
            <div className="flex mt-6 space-x-4">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}

          {/* Display success message if available */}
          {successMessage && (
            <div className="mt-4 text-green-500">{successMessage}</div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No alumni details found.
        </div>
      )}
    </div>
  );
};

export default AlumniDetailsPage;
