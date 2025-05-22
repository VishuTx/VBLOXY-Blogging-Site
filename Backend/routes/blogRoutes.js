const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const blogController = require('../controllers/blogController');

router.post('/create', auth, blogController.createBlog);
router.get('/mine', auth, blogController.getUserBlogs);
router.get('/all', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/edit/:id', auth, blogController.updateBlog);

module.exports = router;
