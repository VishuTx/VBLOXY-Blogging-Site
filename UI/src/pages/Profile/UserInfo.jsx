import React, { useState } from 'react';
import './UserInfo.css';


const UserInfo = ({ user, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editData);
    setEditing(false);
  };

  return (
    <div className="user-info">
      <div className="profile-image">
        {/* <img src={`/api${user.profileImage}`} alt="Profile" /> */}
{/* <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" /> */}

<img
  src={user.profileImage ? `http://localhost:5000${user.profileImage}` : '/default-avatar.png'}
  alt="Profile"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/default-avatar.png';
  }}
/>


      </div>
      {!editing ? (
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button className="edit-button" onClick={() => setEditing(true)}>
            ✏️ Edit
          </button>
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <div className="edit-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserInfo;
