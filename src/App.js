import React, { useState, useEffect } from "react";
import "./App.css"
function App() {
  // Initialize profile state from localStorage or default values
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "Arnab Biswas",
          email: "arnabbiswas.mdt@gmail.com",
          bio: "I am a Front-end developer.",
        };
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Temporary state to manage form inputs
  const [formData, setFormData] = useState(profile);

  // Sync localStorage whenever profile state changes
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update profile
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData); // Update profile state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>Dynamic State Management - Edit Profile</h1>
      {isEditing ? (
        // Edit Form
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "8px 0", padding: "8px" }}
            />
          </div>
          <button type="submit" style={{ marginRight: "10px", padding: "8px" }}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ padding: "8px" }}
          >
            Cancel
          </button>
        </form>
      ) : (
        // Profile View
        <div style={{ maxWidth: "400px" }}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <button
            onClick={() => {
              setFormData(profile); // Sync form data with profile
              setIsEditing(true);
            }}
            style={{ padding: "8px" }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
