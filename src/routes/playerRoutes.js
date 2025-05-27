const express = require('express');
const router = express.Router();
const Player = require('../models/TennisPlayer'); // Ensure this path is correct

// GET all players
router.get('/', async (req, res) => {
    console.log('API Request: Attempting to GET all players...'); // <--- IMPORTANT LOG
    try {
        const players = await Player.find();
        console.log('API Response: Successfully retrieved players. Count:', players.length); // <--- IMPORTANT LOG
        res.status(200).json(players);
    } catch (err) {
        console.error('API Error: Error in GET /api/players:', err.message); // <--- IMPORTANT ERROR LOG
        res.status(500).json({ message: err.message });
    }
});

// POST a new player
router.post('/', async (req, res) => {
    console.log('API Request: Attempting to POST a new player with data:', req.body); // <--- IMPORTANT LOG
    const player = new Player({
        name: req.body.name,
        age: req.body.age,
        ranking: req.body.ranking,
        country: req.body.country,
        titles: req.body.titles,
        matchesPlayed: req.body.matchesPlayed,
        winPercentage: req.body.winPercentage
    });

    try {
        const newPlayer = await player.save();
        console.log('API Response: Player saved successfully:', newPlayer); // <--- IMPORTANT LOG
        res.status(201).json(newPlayer);
    } catch (err) {
        console.error('API Error: Error in POST /api/players:', err.message); // <--- IMPORTANT ERROR LOG
        res.status(400).json({ message: err.message });
    }
});

// GET a single player by ID
router.get('/:id', async (req, res) => {
    console.log(`API Request: Attempting to GET player by ID: ${req.params.id}`); // <--- IMPORTANT LOG
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            console.log('API Response: Player not found.'); // <--- IMPORTANT LOG
            return res.status(404).json({ message: 'Player not found' });
        }
        console.log('API Response: Successfully retrieved player:', player.name); // <--- IMPORTANT LOG
        res.status(200).json(player);
    } catch (err) {
        console.error(`API Error: Error in GET /api/players/${req.params.id}:`, err.message); // <--- IMPORTANT ERROR LOG
        res.status(500).json({ message: err.message });
    }
});

// PUT (Update) a player by ID
router.put('/:id', async (req, res) => {
    console.log(`API Request: Attempting to PUT (update) player ID: ${req.params.id} with data:`, req.body); // <--- IMPORTANT LOG
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            console.log('API Response: Player not found for update.'); // <--- IMPORTANT LOG
            return res.status(404).json({ message: 'Player not found' });
        }

        // Update fields if they exist in the request body
        if (req.body.name != null) player.name = req.body.name;
        if (req.body.age != null) player.age = req.body.age;
        if (req.body.ranking != null) player.ranking = req.body.ranking;
        if (req.body.country != null) player.country = req.body.country;
        if (req.body.titles != null) player.titles = req.body.titles;
        if (req.body.matchesPlayed != null) player.matchesPlayed = req.body.matchesPlayed;
        if (req.body.winPercentage != null) player.winPercentage = req.body.winPercentage;

        const updatedPlayer = await player.save();
        console.log('API Response: Player updated successfully:', updatedPlayer); // <--- IMPORTANT LOG
        res.status(200).json(updatedPlayer);
    } catch (err) {
        console.error(`API Error: Error in PUT /api/players/${req.params.id}:`, err.message); // <--- IMPORTANT ERROR LOG
        res.status(400).json({ message: err.message });
    }
});

// DELETE a player by ID
router.delete('/:id', async (req, res) => {
    console.log(`API Request: Attempting to DELETE player ID: ${req.params.id}`); // <--- IMPORTANT LOG
    try {
        const result = await Player.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            console.log('API Response: Player not found for deletion.'); // <--- IMPORTANT LOG
            return res.status(404).json({ message: 'Player not found' });
        }
        console.log('API Response: Player deleted successfully.'); // <--- IMPORTANT LOG
        res.status(200).json({ message: 'Player deleted' });
    } catch (err) {
        console.error(`API Error: Error in DELETE /api/players/${req.params.id}:`, err.message); // <--- IMPORTANT ERROR LOG
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;