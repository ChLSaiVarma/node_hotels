const express = require('express')
const router=express.Router();
const Person=require('../models/Person')

router.post('/', async (req, res) => {
    try {
      const newPersonData = req.body; //assuming the req body contains person's data
      //create a new persom document using the mongoose model
      const newPerson = new Person(newPersonData);
  
      // Save the new person to the database using await
      const savedPerson = await newPerson.save();
  
      console.log('Saved person to database');
      res.status(201).json(savedPerson);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('Fetched the data');
      res.status(201).json(data);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/:work', async (req, res) => {
    try {
    const workType = req.params.work; // Extract the work type
    // from the URL parameter
    // Assuming you already have a Person model and MongoDB
    // connection set up
    const persons = await Person.find({ work: workType });
    // Send the list of persons with the specified work type as
    // a JSON response
    res.json(persons);
    } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });
    router.put('/:id', async (req, res) => {
      try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person
        console.log("chck",updatedPersonData);
        
        // Assuming you have a Person model
        // Find the person by ID and update their data
        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
        });
        
        // If no person is found with the given ID, return a 404 error
        if (!updatedPerson) {
          return res.status(404).json({ error: 'Person not found' });
        }
        
        // Send the updated person data as a JSON response
        res.json(updatedPerson);
      } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    router.delete('/person/:id', async (req, res) => {
      try {
      const personId = req.params.id; // Extract the person's ID
      // from the URL parameter
      // Assuming you have a Person model
            const deletedPerson = await Person.findByIdAndRemove(personId);
      if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
      }
      // Send a success message as a JSON response
      res.json({ message: 'Person deleted successfully' });
      } catch (error) {
      console.error('Error deleting person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports=router;