const express = require('express');
const Tournament = require('../models/Tournament');
const router = express.Router();

// POST: Create a new Tournament
router.post('/', async (req, res) => {
    const { name, location, date, surface, prizeMoney } = req.body;

    if (!name || !location || !date || !surface || !prizeMoney) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const tournament = new Tournament(req.body);
        await tournament.save();
        res.status(201).json(tournament);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create tournament.' });
    }
});

// GET: Retrieve all Tournaments
router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tournaments.' });
    }
});

module.exports = router;