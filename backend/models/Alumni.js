import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contactNumber: String,
  linkedInProfile: String,
  profileUrl: String,
  department: String,
  yearOfGraduation: Number,
  currentOrganization: String,
  currentPosition: String,
  industry: String,
  location: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],
  availabilityForMentorship: Boolean,
  bio: String,
  interests: [String],
  updatedAt: { type: Date, default: Date.now },
});

const Alumni = mongoose.model('Alumni', alumniSchema);

export default Alumni;
