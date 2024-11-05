import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterFaculty } from "../redux/facultySlice";

const FacultyFilterForm = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    name: "",
    department: "",
    position: "",
    publicationYear: "",
    researchInterests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting filters:", filters);
    dispatch(filterFaculty(filters)); // Dispatching filter action with the filter criteria
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-2 p-2 bg-white shadow-md rounded"
    >
      <div className="grid grid-cols-2 gap-1">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={filters.position}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="publicationYear"
            className="block text-sm font-medium text-gray-700"
          >
            Publication Year(s)
          </label>
          <input
            type="text"
            id="publicationYear"
            name="publicationYear"
            value={filters.publicationYear}
            onChange={handleChange}
            placeholder="Comma-separated years (e.g. 2021, 2022)"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="researchInterests"
            className="block text-sm font-medium text-gray-700"
          >
            Research Interest(s)
          </label>
          <input
            type="text"
            id="researchInterests"
            name="researchInterests"
            value={filters.researchInterests}
            onChange={handleChange}
            placeholder="Comma-separated interests (e.g. AI, Machine Learning)"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 pl-4 pr-4  bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Filter
      </button>
    </form>
  );
};

export default FacultyFilterForm;
