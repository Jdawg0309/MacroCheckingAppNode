const express = require('express');
const app = express();

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies (in case you need it)
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Import your router
const userRouter = require('./routes/objects');

// Route to render the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Use the router for /objects routes
app.use('/objects', userRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
