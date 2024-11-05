import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacultyDetail, deleteFaculty } from "../redux/facultySlice";
import { useParams, useNavigate } from "react-router-dom";

const FacultyDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { facultyDetail, loading, error, successMessage } = useSelector(
    (state) => state.faculty
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchFacultyDetail(id)); // Dispatch the fetch action on mount
  }, [dispatch, id]);

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this faculty member?")
    ) {
      dispatch(deleteFaculty(id));
      navigate("/faculty"); // Redirect to faculty list after deletion
    }
  };

  const handleUpdate = () => {
    navigate(`/updateFaculty/${id}`); // Navigate to the update form
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {facultyDetail ? (
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {facultyDetail.profileUrl && (
            <img
              src={facultyDetail.profileUrl}
              alt={`${facultyDetail.name}'s profile`}
              className="w-52 h-52 rounded-full shadow-md mb-4"
            />
          )}

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {facultyDetail.name}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>Department:</strong> {facultyDetail.department}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Email:</strong> {facultyDetail.email}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Contact:</strong> {facultyDetail.contact}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Position:</strong> {facultyDetail.position}
          </p>

          {/* Academic Qualifications */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">
              Research Statement:
            </h2>
            <p className="text-gray-600 mb-4">
              {facultyDetail.researchStatement}
            </p>
            <h2 className="text-xl font-medium text-gray-700">
              Academic Qualifications:
            </h2>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
              {facultyDetail.academicQualifications.map(
                (qualification, index) => (
                  <li key={index}>{qualification}</li>
                )
              )}
            </ul>
          </div>

          {/* Research Interests */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">
              Research Interests:
            </h2>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
              {facultyDetail.researchInterests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>

          {/* Publications */}
          <div className="w-full mt-4">
            <h2 className="text-xl font-medium text-gray-700">Publications:</h2>
            <ul className="list-disc list-inside">
              {facultyDetail.publications.map((pub, index) => (
                <li key={index}>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {pub.title} {/* Display title as a link */}
                    </a>
                  ) : (
                    <span>{pub.title}</span>
                  )}
                  {pub.year && ` (${pub.year})`}{" "}
                  {/* Display year if available */}
                </li>
              ))}
            </ul>
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
          No faculty details found.
        </div>
      )}
    </div>
  );
};

export default FacultyDetailsPage;
