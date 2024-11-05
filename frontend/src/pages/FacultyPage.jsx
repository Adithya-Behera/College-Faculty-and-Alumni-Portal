// FacultyPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaculty, filterFaculty } from "../redux/facultySlice";
import FacultyFilterForm from "../components/FacultyFilterForm";
import FacultyCard from "../components/FacultyCard";
import { Link } from 'react-router-dom';
const FacultyPage = () => {
  const dispatch = useDispatch();
  const faculty = useSelector((state) => state.faculty.facultyList);
  const loading = useSelector((state) => state.faculty.loading);
  const error = useSelector((state) => state.faculty.error); // Get error state

  useEffect(() => {
    dispatch(fetchFaculty());
  }, [dispatch]);

  const handleFilter = (filterData) => {
    dispatch(filterFaculty(filterData));
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold pb-1 ">Filter Faculty</h1>
      <FacultyFilterForm onFilter={handleFilter} />
      <h1 className="text-2xl font-bold mb-4">Faculty Members</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : faculty ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {faculty.map((member) => (
            <Link key={member._id} to={`/faculty/${member._id}`}>
              <FacultyCard facultyMember={member} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No faculty members found.</p>
      )}
    </div>
  );
};

export default FacultyPage;
