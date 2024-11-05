import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterAlumni } from "../redux/alumniSlice"; // Adjust this import based on your actual file structure

const AlumniFilterComponent = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    name: "",
    department: "",
    yearOfGraduation: "",
    currentPosition: "",
    currentOrganization: "",
    location: "",
    interests: "",
    availabilityForMentorship: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting filters:", filters);
    dispatch(filterAlumni(filters)); // Dispatching filter action with the filter criteria
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
            htmlFor="yearOfGraduation"
            className="block text-sm font-medium text-gray-700"
          >
            Year of Graduation
          </label>
          <input
            type="number"
            id="yearOfGraduation"
            name="yearOfGraduation"
            value={filters.yearOfGraduation}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="currentPosition"
            className="block text-sm font-medium text-gray-700"
          >
            Current Position
          </label>
          <input
            type="text"
            id="currentPosition"
            name="currentPosition"
            value={filters.currentPosition}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="currentOrganization"
            className="block text-sm font-medium text-gray-700"
          >
            Current Organization
          </label>
          <input
            type="text"
            id="currentOrganization"
            name="currentOrganization"
            value={filters.currentOrganization}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="interests"
            className="block text-sm font-medium text-gray-700"
          >
            Interests
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={filters.interests}
            onChange={handleChange}
            placeholder="Comma-separated interests (e.g. AI, Data Science)"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="availabilityForMentorship"
            className="block text-sm font-medium text-gray-700"
          >
            Availability for Mentorship
          </label>
          <select
            id="availabilityForMentorship"
            name="availabilityForMentorship"
            value={filters.availabilityForMentorship}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select...</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={filters.skills}
            onChange={handleChange}
            placeholder="Comma-separated skills (e.g. Java, Python)"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 pl-4 pr-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Filter
      </button>
    </form>
  );
};

export default AlumniFilterComponent;
