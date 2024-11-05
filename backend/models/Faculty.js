import mongoose from "mongoose";
const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileUrl: { type: String},
  contact: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  position: { type: String },
  publications: [{
    title: { type: String },
    url: { type: String },   
    year: { type: Number }    
  }],
  researchStatement: { type: String },
  academicQualifications: [{ type: String }],
  researchInterests: [{ type: String }],
});

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;
