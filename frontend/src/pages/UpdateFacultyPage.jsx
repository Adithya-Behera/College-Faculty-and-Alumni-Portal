import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFacultyDetail, updateFaculty } from "../redux/facultySlice";

const UpdateFacultyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const faculty = useSelector((state) => state.faculty.facultyDetail);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    contact: "",
    position: "",
    researchStatement: "",
    publications: [{ title: "", url: "", year: "" }],
    academicQualifications: [""],
    researchInterests: [""],
    imageUrl: null,
  });

  // Fetch faculty details on component mount
  useEffect(() => {
    dispatch(fetchFacultyDetail(id));
  }, [dispatch, id]);

  // Update formData when faculty details are fetched
  useEffect(() => {
    if (faculty) {
      setFormData({
        name: faculty.name || "",
        department: faculty.department || "",
        email: faculty.email || "",
        contact: faculty.contact || "",
        position: faculty.position || "",
        researchStatement: faculty.researchStatement || "",
        publications: faculty.publications.length
          ? faculty.publications
          : [{ title: "", url: "", year: "" }],
        academicQualifications: faculty.academicQualifications.length
          ? faculty.academicQualifications
          : [""],
        researchInterests: faculty.researchInterests.length
          ? faculty.researchInterests
          : [""],
        imageUrl: null,
      });
    }
  }, [faculty]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: e.target.files[0],
    }));
  };

  // Handle changes in publications
  const handlePublicationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPublications = formData.publications.map((pub, i) =>
      i === index ? { ...pub, [name]: value } : pub
    );
    setFormData((prevData) => ({
      ...prevData,
      publications: updatedPublications,
    }));
  };

  // Handle changes in academic qualifications
  const handleQualificationChange = (index, e) => {
    const { value } = e.target;
    const updatedQualifications = [...formData.academicQualifications];
    updatedQualifications[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: updatedQualifications,
    }));
  };

  // Handle changes in research interests
  const handleResearchInterestChange = (index, value) => {
    const updatedInterests = formData.researchInterests.map((interest, i) =>
      i === index ? value : interest
    );
    setFormData((prevData) => ({
      ...prevData,
      researchInterests: updatedInterests,
    }));
  };

  // Add a new publication field
  const addPublication = () => {
    setFormData((prevData) => ({
      ...prevData,
      publications: [
        ...prevData.publications,
        { title: "", url: "", year: "" },
      ],
    }));
  };

  // Add a new qualification field
  const addQualification = () => {
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: [...prevData.academicQualifications, ""],
    }));
  };

  // Add a new research interest field
  const addResearchInterest = () => {
    setFormData((prevData) => ({
      ...prevData,
      researchInterests: [...prevData.researchInterests, ""],
    }));
  };

  // Remove a publication field
  const removePublication = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      publications: prevData.publications.filter((_, i) => i !== index),
    }));
  };

  // Remove a qualification field
  const removeQualification = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: prevData.academicQualifications.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const removeResearchInterestChange = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      researchInterests: prevData.researchInterests.filter(
        (_, i) => i !== index
      ),
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();

    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("department", formData.department);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("contact", formData.contact);
    dataToSubmit.append("position", formData.position);
    dataToSubmit.append("researchStatement", formData.researchStatement);
    if (formData.imageUrl) {
      dataToSubmit.append("imageUrl", formData.imageUrl);
    }

    formData.publications.forEach((pub, i) => {
      dataToSubmit.append(`publications[${i}][title]`, pub.title);
      dataToSubmit.append(`publications[${i}][url]`, pub.url);
      dataToSubmit.append(`publications[${i}][year]`, pub.year);
    });

    formData.academicQualifications.forEach((qualification, i) => {
      dataToSubmit.append(`academicQualifications[${i}]`, qualification);
    });

    formData.researchInterests.forEach((interest, i) => {
      dataToSubmit.append(`researchInterests[${i}]`, interest);
    });

    await dispatch(updateFaculty({ id, data: dataToSubmit })).unwrap();
    navigate(`/faculty/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Faculty</h2>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>
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
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        {/* Publications Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Publications</h3>
        {formData.publications.map((pub, index) => (
          <div key={index} className="mb-4 flex flex-col gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={pub.title}
                onChange={(e) => handlePublicationChange(index, e)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL:
              </label>
              <input
                type="text"
                name="url"
                value={pub.url}
                onChange={(e) => handlePublicationChange(index, e)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year:
              </label>
              <input
                type="text"
                name="year"
                value={pub.year}
                onChange={(e) => handlePublicationChange(index, e)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
            </div>
            <button
              type="button"
              onClick={() => removePublication(index)}
              className="mt-2 text-red-600 hover:underline"
            >
              Remove Publication
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPublication}
          className="mb-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Publication
        </button>

        {/* Academic Qualifications Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">
          Academic Qualifications
        </h3>
        {formData.academicQualifications.map((qualification, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={qualification}
              onChange={(e) => handleQualificationChange(index, e)}
              placeholder="Qualification"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="mt-2 text-red-600 hover:underline"
            >
              Remove Qualification
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQualification}
          className="mb-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Qualification
        </button>

        {/* Research Interests Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Research Interests</h3>
        {formData.researchInterests.map((interest, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={interest}
              onChange={(e) =>
                handleResearchInterestChange(index, e.target.value)
              }
              placeholder="Research Interest"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
            <button
              type="button"
              onClick={() => removeResearchInterestChange(index)}
              className="mt-2 text-red-600 hover:underline"
            >
              Remove Qualification
            </button>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addResearchInterest}
            className="mb-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Research Interest
          </button>

          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Faculty
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFacultyPage;
