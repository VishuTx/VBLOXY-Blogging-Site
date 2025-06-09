import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import BlogCard from './BlogCard';
import './ProfilePage.css';
import SplitText from '../../components/Animations/SplitText';



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

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs/mine', { withCredentials: true });
      const published = res.data.filter(blog => blog.status === 'published');
      const drafts = res.data.filter(blog => blog.status === 'draft');
      setBlogs({ published, drafts });
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
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
      <SplitText
        text={`Hello, ${user.name}!`}
        className="split-text-heading"
        // style={{
        //   fontSize: "2.5rem",
        //   color: "#333",
        //   fontFamily: "Arial, sans-serif",
        //   fontWeight: "bold",
        //   textAlign: "center",
        //   marginBottom: "20px",
        //   fontWeight: "700",
        // }}
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <UserInfo user={user} onUpdate={handleUpdateUser} />

      <div className="publish-blog">
        <h2>Why wait for a blog when you can create one now?</h2>
        <button onClick={() => (window.location.href = "/publish")}>
          Publish Now
        </button>
      </div>

      <div className="tab-section">
        <button
          className={activeTab === "published" ? "active-tab" : ""}
          onClick={() => setActiveTab("published")}
        >
          Published
        </button>
        <button
          className={activeTab === "drafts" ? "active-tab" : ""}
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
        </button>
      </div>

      <div className="blogs-section">
        {blogs[activeTab].length === 0 ? (
          <p>No {activeTab} blogs found.</p>
        ) : (
          blogs[activeTab].map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              isDraft={activeTab === "drafts"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
