import React, { useState } from "react";
import { createAlumni } from "../redux/alumniSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const AlumniForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    linkedInProfile: "",
    profileUrl: "",
    department: "",
    yearOfGraduation: "",
    currentOrganization: "",
    currentPosition: "",
    industry: "",
    location: "",
    skills: [""],
    awards: [{ title: "", year: "", description: "" }],
    projects: [{ title: "", description: "", link: "" }],
    availabilityForMentorship: false,
    bio: "",
    interests: [""],
    imageUrl: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, imageUrl: files[0] });
    } else if (name.includes("interests") || name.includes("skills")) {
      const index = Number(name.split(".")[1]);
      const key = name.split(".")[0];
      const newArray = [...formData[key]];
      newArray[index] = value;
      setFormData({ ...formData, [key]: newArray });
    } else if (name.includes("awards") || name.includes("projects")) {
      const index = Number(name.split(".")[1]);
      const key = name.split(".")[0];
      const newArray = [...formData[key]];
      newArray[index] = { ...newArray[index], [name.split(".")[2]]: value };
      setFormData({ ...formData, [key]: newArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = (key) => {
    if (key === "skills" || key === "interests") {
      setFormData({ ...formData, [key]: [...formData[key], ""] });
    } else if (key === "awards") {
      setFormData({
        ...formData,
        awards: [...formData.awards, { title: "", year: "", description: "" }],
      });
    } else if (key === "projects") {
      setFormData({
        ...formData,
        projects: [
          ...formData.projects,
          { title: "", description: "", link: "" },
        ],
      });
    }
  };

  const handleRemove = (key, index) => {
    const newArray = formData[key].filter((_, i) => i !== index);
    setFormData({ ...formData, [key]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          if (typeof item === "object") {
            for (const subKey in item) {
              form.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          } else {
            form.append(`${key}[${index}]`, item);
          }
        });
      } else {
        form.append(key, formData[key]);
      }
    }

    dispatch(createAlumni(form));
    navigate(`/alumni`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Alumni Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="imageUrl">
              Profile Picture
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="linkedInProfile">
            LinkedIn Profile
          </label>
          <input
            type="text"
            id="linkedInProfile"
            name="linkedInProfile"
            value={formData.linkedInProfile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="department">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="yearOfGraduation">
            Year of Graduation
          </label>
          <input
            type="number"
            id="yearOfGraduation"
            name="yearOfGraduation"
            value={formData.yearOfGraduation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-1 font-medium"
            htmlFor="currentOrganization"
          >
            Current Organization
          </label>
          <input
            type="text"
            id="currentOrganization"
            name="currentOrganization"
            value={formData.currentOrganization}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="currentPosition">
            Current Position
          </label>
          <input
            type="text"
            id="currentPosition"
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="industry">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name={`skills.${index}`}
                value={skill}
                onChange={handleChange}
                className="flex-grow p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemove("skills", index)}
                className="ml-2 text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("skills")}
            className="mt-2 text-blue-600"
          >
            Add Skill
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Projects</label>
          {formData.projects.map((project, index) => (
            <div key={index} className="mb-2 border p-2 rounded">
              <input
                type="text"
                name={`projects.${index}.title`}
                placeholder="Project Title"
                value={project.title}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                name={`projects.${index}.link`}
                placeholder="Project Link"
                value={project.link}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-1"
              />
              <textarea
                name={`projects.${index}.description`}
                placeholder="Project Description"
                value={project.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-1"
              />
              <button
                type="button"
                onClick={() => handleRemove("projects", index)}
                className="text-red-600"
              >
                Remove Project
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("projects")}
            className="mt-2 text-blue-600"
          >
            Add Project
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Interests</label>
          {formData.interests.map((interest, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name={`interests.${index}`}
                value={interest}
                onChange={handleChange}
                className="flex-grow p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemove("interests", index)}
                className="ml-2 text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("interests")}
            className="mt-2 text-blue-600"
          >
            Add Interest
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="availabilityForMentorship"
              checked={formData.availabilityForMentorship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availabilityForMentorship: e.target.checked,
                })
              }
              className="mr-2"
            />
            Available for Mentorship
          </label>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AlumniForm;
