const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateSalt, hashPassword } = require('../utils/hash');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const salt = generateSalt();
    const hashed = hashPassword(password, salt);

    const user = new User({ name, email, password: hashed, salt, profileImage });
    await user.save();

    return res.status(201).json({ msg: 'User created' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const hashed = hashPassword(password, user.salt);
    if (hashed !== user.password) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000
    });

    return res.json({ msg: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -salt');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};