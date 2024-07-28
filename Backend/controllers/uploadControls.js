const UserUploadData = require("../models/uploadData");

const getimageData = async (req, res) => {
    try {
        const UserUploadDataRes = await UserUploadData.find({
            userId: req.user.id,
            name: {
                $regex: req.body.search,
                $options: "i",
            },
        });
        res.status(200).json(UserUploadDataRes);
        if (!UserUploadDataRes) return res.status(400).json([{ message: 'req failed', type: 'error' }]);

    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}

const createupload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json([{ message: 'No file uploaded', type: 'error' }]);
        }

        const newUploadData = {
            userId: req.user.id,
            name: req.body.name,
            imageUrl: req.file.path
        };

        const UserUploadDataObj = new UserUploadData(newUploadData);
        await UserUploadDataObj.save();

        res.status(200).json(UserUploadDataObj);
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getimageData,
    createupload
}
