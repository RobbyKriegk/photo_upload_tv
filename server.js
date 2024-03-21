const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '/')));
console.log('test0');

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
            if (err) {
                res.status(500).send('Error reading uploads directory');
            } else if (files.length === 0) {
                res.status(404).send('No files in uploads directory');
            } 
            // else {
            //     fs.unlink(path.join(__dirname, 'uploads', files[0]), (err) => {
            //         if (err) {
            //             res.status(500).send('Error deleting file');
            //         } else {
            //             console.log('File deleted');
            //         }
            //     });
            // }
        })
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.get('/request', (req, res) => {
    fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
        if (err) {
            res.status(500).send('Error reading uploads directory');
        } else if (files.length === 0) {
            res.status(404).send('No files in uploads directory');
        } 
        else {
            const firstFileUrl = `/uploads/${files[0]}`;
            console.log(files);
            console.log(firstFileUrl);
            res.json({ url: firstFileUrl });
        }
    });
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
    console.log('test1');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
