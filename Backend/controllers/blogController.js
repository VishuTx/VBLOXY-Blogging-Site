const Blog = require('../models/Blog');
const User = require('../models/User');

exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags, status = 'draft', blogId } = req.body;
    const user = await User.findById(req.user.id);

    if (blogId) {
      // Auto-save or editing
      const updated = await Blog.findOneAndUpdate(
        { _id: blogId, 'createdBy._id': user._id },
        { title, content, tags, status, updatedAt: new Date() },
        { new: true }
      );
      return res.json(updated);
    } else {
      // New blog
      const blog = new Blog({
        title,
        content,
        tags,
        status,
        createdBy: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
      await blog.save();
      return res.status(201).json(blog);
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserBlogs = async (req, res) => {
  const blogs = await Blog.find({ 'createdBy._id': req.user.id });
  res.json(blogs);
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: 'published' });
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });
  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  const { title, content, tags, status } = req.body;
  const updated = await Blog.findOneAndUpdate(
    { _id: req.params.id, 'createdBy._id': req.user.id },
    { title, content, tags, status, updatedAt: new Date() },
    { new: true }
  );
  res.json(updated);
};
