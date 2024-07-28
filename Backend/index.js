const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

const port = 8086;

// Set up database connection
const connectingD = async () => {
    await mongoose.connect('mongodb+srv://Deepak25:gta5mods@cluster0.bk2xyo5.mongodb.net/Dobby?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.log('Error connecting to the database', err);
        });
}
connectingD();

// Setup storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
}).single('image');

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', require('./routes/Usersroutes'));
app.use('/img', require('./routes/fileUploadsroutes')(upload));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
