import React from "react";
import IIESTImage from "../assets/IIEST.jpg";

const HomePage = () => (
  <div className="text-gray-800">
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white relative"
      style={{
        backgroundImage: `url(${IIESTImage})`,
      }}
    >
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text and Button on Image */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to IIEST, Shibpur</h1>
        <p className="text-xl mb-6">Empowering the Nation Since 1856</p>
        <button className="bg-white text-blue-900 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200">
          Learn More About Us
        </button>
      </div>
    </div>

    {/* About Section */}
    <div className="bg-gray-100 py-12 px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        About IIEST, Shibpur
      </h2>
      <p className="max-w-3xl mx-auto text-center">
        IIEST, Shibpur (Erstwhile "Bengal Engineering College") ranks 27th in
        NIRF-2021 among Engineering Institutes. It is the first college to
        become Indian Institute of Engineering Science and Technology (IIEST) in
        India in 2014. Established in 1856, it is the 3rd engineering college in
        India and has 16 departments and 8 schools.
      </p>
    </div>

    {/* Mission and Vision Section */}
    <div className="bg-white py-12 px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Our Mission & Vision
      </h2>
      <p className="max-w-2xl mx-auto text-center">
        IIEST, Shibpur strives to become a world-class institution providing a
        state-of-the-art multidisciplinary research environment to foster
        innovation and develop technologies for the progress of society and a
        developed India.
      </p>
    </div>

    {/* Departments Section */}
    <div className="bg-gray-100 py-12 px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Academic Departments & Schools
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          "Civil Engineering",
          "Computer Science and Engineering",
          "Electrical Engineering",
          "Electronics and Communication Engineering",
          "Mechanical Engineering",
          "Information Technology",
          "Production Engineering",
          "Architecture",
          "Applied Mechanics",
          "Chemistry",
          "Mathematics",
          "Physics",
          "Humanities and Social Sciences",
          "Management",
          "Environmental Engineering",
          "Mining Engineering",
        ].map((department, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg text-center"
          >
            <p>{department}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Statistics Section */}
    <div className="bg-blue-100 py-12 px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        IIEST by the Numbers
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        <div className="text-center">
          <h3 className="text-4xl font-bold">250+</h3>
          <p>Faculty Members</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold">4000+</h3>
          <p>Student Strength</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold">1856</h3>
          <p>Year Established</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold">27th</h3>
          <p>NIRF 2021 Ranking</p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-4xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} IIEST, Shibpur</p>
        <p>
          Empowering the nation through education and innovation since 1856.
        </p>
      </div>
    </footer>
  </div>
);

export default HomePage;
