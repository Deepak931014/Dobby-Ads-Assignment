const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { getimageData, createupload } = require('../controllers/uploadControls.js');

module.exports = (upload) => {
    router.post('/upload', auth, upload, createupload);
    router.post('/get-all-upload', auth, getimageData);
    return router;
};
