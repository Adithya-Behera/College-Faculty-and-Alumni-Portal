import React, { useEffect, useState } from "react";
import { updateAlumni, fetchAlumniDetail } from "../redux/alumniSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UpdateAlumniPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    yearOfGraduation: "",
    currentPosition: "",
    currentOrganization: "",
    location: "",
    interests: [""],
    projects: [{ title: "", description: "", link: "" }],
    bio: "",
    availabilityForMentorship: false,
    imageUrl: null,
  });

  const alumniData = useSelector((state) => state.alumni.alumniDetail);

  useEffect(() => {
    // Fetch existing alumni data
    const fetchData = async () => {
      await dispatch(fetchAlumniDetail(id));
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (alumniData) {
      setFormData({ ...alumniData, imageUrl: null }); // Reset imageUrl for file upload
    }
  }, [alumniData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...formData.interests];
    updatedInterests[index] = value;
    setFormData({ ...formData, interests: updatedInterests });
  };

  const addInterest = () => {
    setFormData({ ...formData, interests: [...formData.interests, ""] });
  };

  const removeInterest = (index) => {
    const updatedInterests = formData.interests.filter((_, i) => i !== index);
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", link: "" },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Loop through formData and append to FormData
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          if (typeof item === "object") {
            for (const subKey in item) {
              form.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          } else {
            form.append(`${key}`, item); // Correctly append without []
          }
        });
      } else {
        if (key === "imageUrl" && formData.imageUrl) {
          form.append(key, formData.imageUrl); // Append the file
        } else {
          form.append(key, formData[key]); // Append other fields
        }
      }
    }

    // Log FormData contents for debugging
    for (const [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Dispatch the update action with the form data
    dispatch(updateAlumni({ id, data: form })); // Pass the FormData correctly
    navigate(`/alumni/${id}`); // Redirect to the alumni details page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Update Alumni Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
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
            className="block w-full p-2 border border-gray-300 rounded-md"
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
            className="block w-full p-2 border border-gray-300 rounded-md"
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
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Year of Graduation:
          </label>
          <input
            type="number"
            name="yearOfGraduation"
            value={formData.yearOfGraduation}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Current Position:
          </label>
          <input
            type="text"
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Current Organization:
          </label>
          <input
            type="text"
            name="currentOrganization"
            value={formData.currentOrganization}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Interests:
          </label>
          {formData.interests.map((interest, index) => (
            <div className="flex items-center mb-2" key={index}>
              <input
                type="text"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeInterest(index)}
                className="ml-2 text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addInterest} className="text-blue-600">
            Add Interest
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Projects:
          </label>
          {formData.projects.map((project, index) => (
            <div className="flex items-center mb-2" key={index}>
              <input
                type="text"
                placeholder="Title"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Description"
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Link"
                value={project.link}
                onChange={(e) =>
                  handleProjectChange(index, "link", e.target.value)
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="ml-2 text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addProject} className="text-blue-600">
            Add Project
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Bio:
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Available for Mentorship:
          </label>
          <select
            name="availabilityForMentorship"
            value={formData.availabilityForMentorship ? "true" : "false"}
            onChange={(e) =>
              setFormData({
                ...formData,
                availabilityForMentorship: e.target.value === "true",
              })
            }
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAlumniPage;
