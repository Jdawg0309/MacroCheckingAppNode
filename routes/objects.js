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
    const { date, meal, 'food-item': foodItem, servings, calories, protein, carbs, fats } = req.body;

    if (!date || !meal || !foodItem) {
        return res.status(400).send('Invalid data: Date, meal, and food-item are required.');
    }

    const newEntry = { date, meal, 'food-item': foodItem, servings, calories, protein, carbs, fats };
    const existingData = readDataFromFile();
    existingData.push(newEntry);
    writeDataToFile(existingData);

    res.status(201).json(newEntry);

});

router.delete('/', (req, res) => {
    const { date, foodItem } = req.body;

    if (!date || !foodItem) {
        return res.status(400).send('Invalid data: Date and food-item are required.');
    }

    const existingData = readDataFromFile();

    // Filter out the entry to delete
    const updatedData = existingData.filter(entry => !(entry.date === date && entry['food-item'] === foodItem));

    // Write updated data back to the file
    writeDataToFile(updatedData);

    // Send response indicating success
    res.status(204).send(); // No content to send back
});


// GET route to read and display all objects from the JSON file
router.get('/', (req, res) => {
    const data = readDataFromFile(); // Read data from the JSON file
    res.json(data); // Send the data back as a JSON response
});

module.exports = router;
