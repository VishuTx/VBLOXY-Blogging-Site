import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import BlogCard from './BlogCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('published');
  const [blogs, setBlogs] = useState({ published: [], drafts: [] });

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/auth/profile', { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const fetchBlogs = async (type) => {
    try {
      const res = await axios.get('/api/blogs/mine', { withCredentials: true });
      const published = res.data.filter(blog => blog.status === 'published');
      const drafts = res.data.filter(blog => blog.status === 'draft');
      setBlogs({ published, drafts });
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await axios.put('/api/auth/profile', updatedData, { withCredentials: true });
      fetchProfile();
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [activeTab]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <UserInfo user={user} onUpdate={handleUpdateUser} />
      <div className="tab-section">
        <button
          className={activeTab === 'published' ? 'active-tab' : ''}
          onClick={() => setActiveTab('published')}
        >
          Published
        </button>
        <button
          className={activeTab === 'drafts' ? 'active-tab' : ''}
          onClick={() => setActiveTab('drafts')}
        >
          Drafts
        </button>
      </div>

      <div className="blogs-section">
        {blogs[activeTab].length === 0 ? (
          <p>No {activeTab} blogs found.</p>
        ) : (
          blogs[activeTab].map(blog => (
            <BlogCard key={blog._id} blog={blog} isDraft={activeTab === 'drafts'} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
