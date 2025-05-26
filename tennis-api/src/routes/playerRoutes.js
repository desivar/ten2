const express = require('express');
const TennisPlayer = require('../models/TennisPlayer');
const router = express.Router();

// POST: Create a new Tennis Player
router.post('/', async (req, res) => {
    const { name, age, ranking, country, titles, matchesPlayed, winPercentage } = req.body;

    if (!name || !age || !ranking || !country || !titles || !matchesPlayed || !winPercentage) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const player = new TennisPlayer(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create player.' });
    }
});

// GET: Retrieve all Tennis Players
router.get('/', async (req, res) => {
    try {
        const players = await TennisPlayer.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve players.' });
    }
});

module.exports = router;