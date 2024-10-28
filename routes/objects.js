const express = require('express');
const fs = require('fs'); // File System module to work with files
const router = express.Router();

// Path to the JSON file where data will be stored
const DATA_FILE = './data/objects.json';

// Helper function to read from the JSON file
function readDataFromFile() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8'); // Read the file
        return JSON.parse(data); // Parse and return JSON content
    } catch (err) {
        console.error("Error reading file:", err);
        return []; // Return an empty array if file doesn't exist or is unreadable
    }
}

// Helper function to write data to the JSON file
function writeDataToFile(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); // Write JSON data to file
    } catch (err) {
        console.error("Error writing to file:", err);
    }
}

// POST route to receive and store user data
router.post('/', (req, res) => {
    const newObject = req.body; // Capture the incoming data
    const existingData = readDataFromFile(); // Read existing data from the file

    existingData.push(newObject); // Add the new object to the existing data
    writeDataToFile(existingData); // Save the updated data back to the file

    res.status(201).send("Data saved successfully!");
});

// GET route to read and display all objects from the JSON file
router.get('/', (req, res) => {
    const data = readDataFromFile(); // Read data from the JSON file
    res.json(data); // Send the data back as a JSON response
});

module.exports = router;
