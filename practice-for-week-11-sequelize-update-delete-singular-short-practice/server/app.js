// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    const updatePup = await Puppy.findByPk(req.params.puppyId);

    const {age_yrs, weight_lbs, microchipped} = req.body

    updatePup.update(req.body);
    
    res.json({
        message : 'successful',
        data: updatePup
    });
});


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    const ripPup = await Puppy.findByPk(req.params.puppyId);

    await ripPup.destroy();

    res.json({
        message : `The puppy has been put down :(`
    })
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5002;
app.listen(port, () => console.log('Server is listening on port', port));