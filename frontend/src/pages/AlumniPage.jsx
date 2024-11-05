// AlumniPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlumni, filterAlumni } from "../redux/alumniSlice"; // Import the alumni slice
import AlumniFilterForm from "../components/AlumniFilterForm"; // Component for filtering alumni
import AlumniCard from "../components/AlumniCard"; // Component for displaying each alumni card
import { Link } from 'react-router-dom';

const AlumniPage = () => {
  const dispatch = useDispatch();
  const alumni = useSelector((state) => state.alumni.alumniList); // Selector for alumni list
  const loading = useSelector((state) => state.alumni.loading); // Selector for loading state
  const error = useSelector((state) => state.alumni.error); // Selector for error state

  useEffect(() => {
    dispatch(fetchAlumni()); // Fetch all alumni when the component mounts
  }, [dispatch]);

  const handleFilter = (filterData) => {
    dispatch(filterAlumni(filterData)); // Dispatch filter action with filter data
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold pb-1">Filter Alumni</h1>
      <AlumniFilterForm onFilter={handleFilter} /> {/* Alumni filter form */}
      <h1 className="text-2xl font-bold mb-4">Alumni Members</h1>
      {loading ? (
        <p>Loading...</p> // Loading state
      ) : error ? (
        <p className="text-red-500">{error}</p> // Error message
      ) : alumni.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {alumni.map((member) => (
            <Link key={member._id} to={`/alumni/${member._id}`}> {/* Link to individual alumni details */}
              <AlumniCard alumniMember={member} /> {/* Alumni card component */}
            </Link>
          ))}
        </div>
      ) : (
        <p>No alumni members found.</p> // Message when no alumni are found
      )}
    </div>
  );
};

export default AlumniPage;
