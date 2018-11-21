//THIS FILE IN THE API FOLDER PACKAGES ALL THE ROUTES AND EXPORTS THEM TO THE OTHER INDEX.JS FILE OUTSIDE OF THE API FOLDER

const router = require('express').Router();
const bookRoutes = require('./books');

router.use('/books', bookRoutes);

module.exports = router;