import React, { useState } from "react";

const ExperienceInputComponent = () => {
  // @ Experience Input State
  const [inputExperiences, setInputExperiences] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    technologiesUsed: "",
  });

  // @ Skills Input State
  const [skills, setSkills] = useState({
    name: "",
    level: "",
  });

  // @ Languages Input State
  const [languages, setLanguages] = useState({
    name: "",
    level: "",
  });

  // @ Achievements Input State
  const [achievements, setAchievements] = useState("");

  // % Handle input change using e.target.name and e.target.value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputExperiences((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // % Handle Add Experience
  const handleAddExperience = (e) => {
    e.preventDefault();
    // @ Check if form data is not empty
    if (!inputExperiences.title || !inputExperiences.company) {
      return alert("Please Fill Out All Fields");
    }
    // @ Create new experience object
    const newExperience = {
      title: inputExperiences.title,
      company: inputExperiences.company,
      location: inputExperiences.location,
      employmentType: inputExperiences.employmentType,
      startDate: inputExperiences.startDate,
      endDate: inputExperiences.endDate,
      responsibilities: inputExperiences.responsibilities,
      technologiesUsed: inputExperiences.technologiesUsed
        .split(",")
        .map((tech) => tech.trim()),
    };
    console.log("New Experience Added:", newExperience);
    // Reset input fields after adding experience
    setInputExperiences({
      title: "",
      company: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
      technologiesUsed: "",
    });
  };

  // % Handle Remove Experience
  const handleRemoveExperience = () => {
    setInputExperiences({
      title: "",
      company: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
      technologiesUsed: "",
    });
  };

  return (
    <div>
      <h1>Experience Input</h1>
      <div className="space-y-2 border p-4 rounded-lg mb-4">
        <input
          type="text"
          placeholder="Job Title"
          name="title"
          value={inputExperiences.title}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Company"
          name="company"
          value={inputExperiences.company}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={inputExperiences.location}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <select
          name="employmentType"
          value={inputExperiences.employmentType}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option>Select Your EmployType</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Freelance</option>
          <option>Contract</option>
          <option>Remote</option>
          <option>Temporary</option>
        </select>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={inputExperiences.startDate}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={inputExperiences.endDate}
          onChange={handleChange}
          className="input input-bordered"
        />
        <textarea
          placeholder="Responsibilities"
          name="responsibilities"
          rows="4"
          value={inputExperiences.responsibilities}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="text"
          name="technologiesUsed"
          placeholder="Technologies used (comma-separated)"
          value={inputExperiences.technologiesUsed}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <div>
          <button
            onClick={handleAddExperience}
            className="btn btn-success mr-3"
          >
            Add Experience
          </button>
          <button onClick={handleRemoveExperience} className="btn btn-error">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceInputComponent;
