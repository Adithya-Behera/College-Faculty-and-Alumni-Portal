import Alumni from "../models/Alumni.js";
import cloudinary from "cloudinary";

async function uploadFileToCloudinary(file, folder, quality) {
  const options = {
    folder: folder,
    resource_type: "auto",
    public_id: file.name,
    use_filename: true,
    unique_filename: false,
  };

  console.log("Temp file path:", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  try {
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
}

// CREATE: Admin only
export const createAlumni = async (req, res) => {
  try {
    const file = req.files ? req.files.imageUrl : null;
    let profilePictureUrl = null;
    console.log("creating alumni->", req.body);

    // Parse req.body directly
    const data = req.body;
    console.log("data is --> ", data);
    console.log("file is --> ", file);

    // Handle file upload if present
    if (file) {
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split(".").pop().toLowerCase();

      if (!supportedTypes.includes(fileType)) {
        return res
          .status(400)
          .json({ success: false, message: "File format not supported" });
      }

      const fileSize = file.size;
      if (fileSize > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Files greater than 5MB are not supported",
        });
      }

      const response = await uploadFileToCloudinary(file, "alumni", 80);
      profilePictureUrl = response.secure_url;
    }

    // Parse contact number and validate
    const contact = parseInt(data.contactNumber, 10);
    if (isNaN(contact)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid contact number" });
    }

    // Parse year of graduation and validate
    const yearOfGraduation = parseInt(data.yearOfGraduation, 10);
    if (isNaN(yearOfGraduation)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid graduation year" });
    }

    // Parse skills, projects, and interests
    const skills = [];
    for (let key in data) {
      if (key.startsWith("skills[")) {
        skills.push(data[key]);
      }
    }

    const projects = [];
    for (let key in data) {
      if (key.startsWith("projects[")) {
        const index = key.match(/\d+/)[0]; // Extract index from key
        const fieldName = key
          .replace(`projects[${index}][`, "")
          .replace("]", "");
        if (!projects[index]) {
          projects[index] = {}; // Initialize the project object
        }
        projects[index][fieldName] = data[key];
      }
    }

    const interests = [];
    for (let key in data) {
      if (key.startsWith("interests[")) {
        interests.push(data[key]);
      }
    }

    // Create Alumni with parsed fields
    const newAlumni = await Alumni.create({
      name: data.name,
      email: data.email,
      contact: contact,
      linkedInProfile: data.linkedInProfile,
      profileUrl: profilePictureUrl,
      department: data.department,
      yearOfGraduation: yearOfGraduation,
      currentOrganization: data.currentOrganization,
      currentPosition: data.currentPosition || null, // Default to null if not provided
      industry: data.industry,
      location: data.location,
      skills,
      projects,
      availabilityForMentorship: data.availabilityForMentorship === "true", // Convert string to boolean
      bio: data.bio,
      interests,
    });

    res.json({
      success: true,
      data: newAlumni,
      imageUrl: profilePictureUrl,
      message: "Alumni successfully created",
    });
  } catch (error) {
    console.error("Error in createAlumni:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// READ: Available to all
export const getAlumni = async (req, res) => {
  try {
    const alumniList = await Alumni.find();
    res.status(200).json({ success: true, data: alumniList });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching alumni data" });
  }
};

// READ: Fetch single alumni member by ID
export const getAlumniById = async (req, res) => {
  try {
    const alumniId = req.params.id;
    const alumni = await Alumni.findById(alumniId);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    console.error("Error fetching alumni member:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching alumni member",
    });
  }
};
// UPDATE: Admin only
export const updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Data from frontend ->", req.body);

    // Find the alumni record by ID
    const alumni = await Alumni.findById(id);
    if (!alumni) {
      return res
        .status(404)
        .json({ success: false, message: "Alumni not found" });
    }

    // Handle file upload if present
    const file = req.files ? req.files.imageUrl : null;
    let profilePictureUrl = alumni.profileUrl;

    if (file) {
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split(".").pop().toLowerCase();

      if (!supportedTypes.includes(fileType)) {
        return res
          .status(400)
          .json({ success: false, message: "File format not supported" });
      }

      if (file.size > 5 * 1024 * 1024) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Files greater than 5MB are not supported",
          });
      }

      const response = await uploadFileToCloudinary(file, "alumni", 80);
      profilePictureUrl = response.secure_url;
    }

    // Parse and validate contact number
    const contact = parseInt(req.body.contactNumber, 10);
    if (isNaN(contact)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid contact number" });
    }

    // Parse and validate year of graduation
    const yearOfGraduation = parseInt(req.body.yearOfGraduation, 10);
    if (isNaN(yearOfGraduation)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid graduation year" });
    }

    // Parse skills, interests, and projects from the request body
    const skills = req.body.skills || []; // Skills are received as an array
    const interests = req.body.interests || []; // Interests are received as an array

    // Extract projects from the request body
    const projects = Object.keys(req.body)
      .filter((key) => key.startsWith("projects["))
      .reduce((acc, key) => {
        const match = key.match(/projects\[(\d+)\]\[(.+)\]/);
        if (match) {
          const index = match[1];
          const field = match[2];
          if (!acc[index]) acc[index] = { _id: req.body[`projects[${index}][_id]`] }; // Include _id
          acc[index][field] = req.body[key];
        }
        return acc;
      }, []);
    
    // Remove any undefined projects
    const filteredProjects = projects.filter(Boolean);

    // Construct the updated alumni data
    const updatedAlumniData = {
      name: req.body.name ?? alumni.name,
      email: req.body.email ?? alumni.email,
      contact,
      linkedInProfile: req.body.linkedInProfile ?? alumni.linkedInProfile,
      profileUrl: profilePictureUrl,
      department: req.body.department ?? alumni.department,
      yearOfGraduation,
      currentOrganization:
        req.body.currentOrganization ?? alumni.currentOrganization,
      currentPosition: req.body.currentPosition ?? alumni.currentPosition,
      industry: req.body.industry ?? alumni.industry,
      location: req.body.location ?? alumni.location,
      skills,
      availabilityForMentorship: req.body.availabilityForMentorship === "true",
      bio: req.body.bio ?? alumni.bio,
      interests,
      projects: filteredProjects, // Add projects to the update
    };

    // Update the alumni record
    const updatedAlumni = await Alumni.findByIdAndUpdate(
      id,
      updatedAlumniData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: updatedAlumni,
      message: "Alumni successfully updated",
    });
  } catch (error) {
    console.error("Error in updateAlumni:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// DELETE: Admin only
export const deleteAlumni = async (req, res) => {
  try {
    const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!deletedAlumni) {
      return res
        .status(404)
        .json({ success: false, message: "Alumni not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Alumni deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting alumni" });
  }
};

// ALL: Filter alumni using query parameters
export const filterAlumni = async (req, res) => {
  const {
    name,
    department,
    yearOfGraduation,
    currentPosition,
    currentOrganization,
    location,
    interests,
    availabilityForMentorship,
    skills,
  } = req.query;

  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (department) {
    filter.department = { $regex: department, $options: "i" };
  }

  if (yearOfGraduation) {
    filter.yearOfGraduation = parseInt(yearOfGraduation, 10);
  }

  if (currentPosition) {
    filter.currentPosition = { $regex: currentPosition, $options: "i" };
  }

  if (currentOrganization) {
    filter.currentOrganization = { $regex: currentOrganization, $options: "i" };
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (interests) {
    filter.interests = {
      $in: Array.isArray(interests) ? interests : [interests],
    };
  }

  if (availabilityForMentorship) {
    filter.availabilityForMentorship = availabilityForMentorship === "true";
  }

  if (skills) {
    filter.skills = { $in: Array.isArray(skills) ? skills : [skills] };
  }
  console.log(filter);
  try {
    const alumni = await Alumni.find(filter);
    res.status(200).json({ success: true, data: alumni });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
