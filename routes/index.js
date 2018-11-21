//THIS IS STEP 5. ONCE YOUR ROUTES ARE MADE AND YOU EXPORT THEM IN THE INDEX.JS FILE IN THE API FOLDER, YOU EXPORT THEM HERE
const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;