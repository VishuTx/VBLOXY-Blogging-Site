import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog, isDraft }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;
    try {
      await fetch(`/api/blogs/edit/${blog._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      window.location.reload();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="blog-card">
      <div onClick={() => navigate(`/blog/${blog._id}`)} className="clickable">
        <h3>{blog.title}</h3>
        <p>Tags: {blog.tags.join(', ')}</p>
        <p>Created: {new Date(blog.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
        <div className="stats">
          <span>❤️ Likes</span>
          <span>👁️ Views</span>
        </div>
      </div>

      {isDraft && (
        <div className="draft-actions">
          <button onClick={() => navigate(`/publish?edit=${blog._id}`)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;