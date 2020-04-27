const router = require('express').Router();
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const userRoutes = require('./user')

router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;
