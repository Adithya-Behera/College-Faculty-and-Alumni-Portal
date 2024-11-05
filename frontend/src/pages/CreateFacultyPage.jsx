import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFaculty } from "../redux/facultySlice";

const CreateFacultyPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: null, // Change profileUrl to imageUrl
    contact: "",
    email: "",
    department: "",
    position: "",
    researchStatement: "",
    publications: [{ title: "", url: "", year: "" }],
    academicQualifications: [""],
    researchInterests: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePublicationChange = (index, e) => {
    const { name, value } = e.target;
    const newPublications = [...formData.publications];
    newPublications[index][name] = value;
    setFormData((prevData) => ({ ...prevData, publications: newPublications }));
  };

  const addPublication = () => {
    setFormData((prevData) => ({
      ...prevData,
      publications: [
        ...prevData.publications,
        { title: "", url: "", year: "" },
      ],
    }));
  };

  const removePublication = (index) => {
    const newPublications = formData.publications.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, publications: newPublications }));
  };

  const handleQualificationChange = (index, e) => {
    const newQualifications = [...formData.academicQualifications];
    newQualifications[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: newQualifications,
    }));
  };

  const addQualification = () => {
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: [...prevData.academicQualifications, ""],
    }));
  };

  const removeQualification = (index) => {
    const newQualifications = formData.academicQualifications.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: newQualifications,
    }));
  };

  const handleResearchInterestChange = (index, value) => {
    const newInterests = [...formData.researchInterests];
    newInterests[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      researchInterests: newInterests,
    }));
  };

  const addResearchInterest = () => {
    setFormData((prevData) => ({
      ...prevData,
      researchInterests: [...prevData.researchInterests, ""],
    }));
  };

  const removeResearchInterest = (index) => {
    const newInterests = formData.researchInterests.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      researchInterests: newInterests,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData instance
    const formDataToSend = new FormData();
    
    // Append each field individually
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("researchStatement", formData.researchStatement);
    
    // Append image file if it exists
    if (formData.imageUrl) {
      formDataToSend.append("imageUrl", formData.imageUrl);
    }
  
    // Append array fields by stringifying them
    formDataToSend.append("publications", JSON.stringify(formData.publications));
    formDataToSend.append("academicQualifications", JSON.stringify(formData.academicQualifications));
    formDataToSend.append("researchInterests", JSON.stringify(formData.researchInterests));
    
    try {
      // Dispatch the action with formDataToSend
      dispatch(createFaculty(formDataToSend));
      alert("Faculty created successfully!");
      navigate(`/faculty`);
      // Reset form data
      setFormData({
        name: "",
        imageUrl: null,
        contact: "",
        email: "",
        department: "",
        position: "",
        researchStatement: "",
        publications: [{ title: "", url: "", year: "" }],
        academicQualifications: [""],
        researchInterests: [""],
      });
    } catch (error) {
      console.error("Error creating faculty:", error);
      alert("Failed to create faculty. Please try again.");
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Faculty</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image:
          </label>
          <input
            type="file"
            name="imageUrl" // Change to imageUrl
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact:
          </label>
          <input
            type="number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Department:
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Position:
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Research Statement:
          </label>
          <textarea
            name="researchStatement"
            value={formData.researchStatement}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          ></textarea>
        </div>

        {/* Publications Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Publications:
          </label>
          {formData.publications.map((publication, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <input
                type="text"
                name="title"
                value={publication.title}
                placeholder="Title"
                onChange={(e) => handlePublicationChange(index, e)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <input
                type="text"
                name="url"
                value={publication.url}
                placeholder="URL"
                onChange={(e) => handlePublicationChange(index, e)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <input
                type="number"
                name="year"
                value={publication.year}
                placeholder="Year"
                onChange={(e) => handlePublicationChange(index, e)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <button
                type="button"
                onClick={() => removePublication(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPublication}
            className="text-blue-500"
          >
            Add Publication
          </button>
        </div>

        {/* Academic Qualifications Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Academic Qualifications:
          </label>
          {formData.academicQualifications.map((qualification, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <input
                type="text"
                value={qualification}
                onChange={(e) => handleQualificationChange(index, e)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <button
                type="button"
                onClick={() => removeQualification(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQualification}
            className="text-blue-500"
          >
            Add Qualification
          </button>
        </div>

        {/* Research Interests Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Research Interests:
          </label>
          {formData.researchInterests.map((interest, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <input
                type="text"
                value={interest}
                onChange={(e) =>
                  handleResearchInterestChange(index, e.target.value)
                }
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
              <button
                type="button"
                onClick={() => removeResearchInterest(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addResearchInterest}
            className="text-blue-500"
          >
            Add Research Interest
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateFacultyPage;
