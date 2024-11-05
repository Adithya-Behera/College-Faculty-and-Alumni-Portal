import Faculty from "../models/Faculty.js";
import cloudinary from "cloudinary";

async function uploadFileToCloudinary(file, folder, quality) {
  const options = {
    folder: folder,
    resource_type: "auto",
    public_id: file.name,
    use_filename: true,
    unique_filename: false,
  };

  console.log("temp file path", file.tempFilePath);

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
export const createFaculty = async (req, res) => {
  try {
    const file = req.files ? req.files.imageUrl : null;
    let profileUrl = null;
    console.log("creating faculty->", req.body);

    // Parse req.body.data from JSON string to JavaScript object
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

      const response = await uploadFileToCloudinary(file, "faculty", 80);
      profileUrl = response.secure_url;
    }

    // Parse contact and validate
    const contact = parseInt(data.contact, 10);
    if (isNaN(contact)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid contact number" });
    }

    // Parse and map publications if it's a JSON string
    let publications = [];
    if (data.publications) {
      try {
        publications = typeof data.publications === "string"
          ? JSON.parse(data.publications)
          : data.publications;

        publications = Array.isArray(publications)
          ? publications.map((pub) => ({
              ...pub,
              year: pub.year ? parseInt(pub.year, 10) : null,
            }))
          : [];
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Invalid format for publications",
        });
      }
    }

    // Parse academic qualifications and research interests if they're JSON strings
    const academicQualifications = data.academicQualifications
      ? (typeof data.academicQualifications === "string"
          ? JSON.parse(data.academicQualifications)
          : data.academicQualifications)
      : [];
    const researchInterests = data.researchInterests
      ? (typeof data.researchInterests === "string"
          ? JSON.parse(data.researchInterests)
          : data.researchInterests)
      : [];

    // Create Faculty with parsed fields
    const newFaculty = await Faculty.create({
      name: data.name,
      profileUrl,
      contact,
      email: data.email,
      department: data.department,
      position: data.position,
      publications,
      researchStatement: data.researchStatement,
      academicQualifications,
      researchInterests,
    });

    res.json({
      success: true,
      data: newFaculty,
      imageUrl: profileUrl,
      message: "Faculty successfully created",
    });
  } catch (error) {
    console.error("Error in createFaculty:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// READ: Available to all
export const getFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json({ success: true, data: facultyList });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching faculty data" });
  }
};

// READ: Fetch single faculty member by ID
export const getFacultyById = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findById(facultyId);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.error("Error fetching faculty member:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching faculty member",
    });
  }
};
// UPDATE: Admin only

export const updateFaculty = async (req, res) => {
  const { id } = req.params;

  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }

    // Initialize profile URL
    let profileUrl = faculty.profileUrl;

    // Handle file upload for profile image if provided
    if (req.files && req.files.imageUrl) {
      const file = req.files.imageUrl;
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split(".").pop().toLowerCase();

      // Validate file type and size
      if (!supportedTypes.includes(fileType)) {
        return res
          .status(400)
          .json({ success: false, message: "File format not supported" });
      }
      if (file.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Files greater than 5MB are not supported",
        });
      }

      // Upload to Cloudinary and get the secure URL
      const response = await uploadFileToCloudinary(file, "faculty", 80);
      profileUrl = response.secure_url;
    }

    // Prepare updated faculty data
    const updatedFacultyData = {
      name: req.body.name ?? faculty.name,
      profileUrl,
      contact: req.body.contact ?? faculty.contact,
      email: req.body.email ?? faculty.email,
      department: req.body.department ?? faculty.department,
      position: req.body.position ?? faculty.position,
      researchStatement:
        req.body.researchStatement ?? faculty.researchStatement,
      publications: [],
      academicQualifications: [],
      researchInterests: [],
    };

    // Handle publications
    for (let i = 0; req.body[`publications[${i}][title]`] !== undefined; i++) {
      const title = req.body[`publications[${i}][title]`];
      const url = req.body[`publications[${i}][url]`];
      const year = req.body[`publications[${i}][year]`];

      // Ensure only valid data is added
      if (title && url && year && !isNaN(Number(year))) {
        updatedFacultyData.publications.push({ title, url, year: Number(year) });
      }
    }

    // Handle academic qualifications
    for (
      let i = 0;
      req.body[`academicQualifications[${i}]`] !== undefined;
      i++
    ) {
      const qualification = req.body[`academicQualifications[${i}]`];
      if (qualification) {
        updatedFacultyData.academicQualifications.push(qualification);
      }
    }

    // Handle research interests
    for (let i = 0; req.body[`researchInterests[${i}]`] !== undefined; i++) {
      const interest = req.body[`researchInterests[${i}]`];
      if (interest) {
        updatedFacultyData.researchInterests.push(interest);
      }
    }

    // Update faculty in the database
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      updatedFacultyData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedFaculty,
      message: "Faculty successfully updated",
    });
  } catch (error) {
    console.error("Error in updateFaculty:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// DELETE: Admin only
export const deleteFaculty = async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting faculty" });
  }
};

// ALL: Filter faculty
export const filterFaculty = async (req, res) => {
  const { name, department, position, publicationYear, researchInterests } =
    req.query;
  const filter = {};
  console.log("Filter fields->", req.query); // This will log the incoming filter fields

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (department) {
    filter.department = { $regex: department, $options: "i" };
  }

  if (position) {
    filter.position = { $regex: position, $options: "i" };
  }

  if (publicationYear) {
    const years = publicationYear.split(",").map(Number);
    filter.publications = {
      $all: years.map((year) => ({
        $elemMatch: { year: year },
      })),
    };
  }

  if (researchInterests) {
    const interests = researchInterests
      .split(",")
      .map((interest) => interest.trim());
    filter.researchInterests = {
      $elemMatch: { $regex: new RegExp(interests.join("|"), "i") },
    };
  }

  try {
    const faculties = await Faculty.find(filter);
    res.status(200).json({ success: true, data: faculties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
