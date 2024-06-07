const express = require('express')
const router=express.Router();
const MenuItem=require('../models/MenuItem')

router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('Fetched the data');
      res.status(201).json(data);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.post('/', async (req, res) => {
    try {
      const data = req.body; 
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
  
      console.log('Saved person to database');
      res.status(201).json(response);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/:taste', async (req, res) => {
    try {
    const tasteType = req.params.taste; // Extract the taste type
    // from the URL parameter
    // Assuming you already have a menu model and MongoDB
    // connection set up
    const persons = await MenuItem.find({ taste: tasteType });
    // Send the list of persons with the specified work type as
    // a JSON response
    res.json(persons);
    } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });
   
    
      module.exports=router;