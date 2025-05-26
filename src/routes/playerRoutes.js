const express = require('express');
const TennisPlayer = require('../models/TennisPlayer');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player management
 */

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create a new Tennis Player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               ranking:
 *                 type: integer
 *               country:
 *                 type: string
 *               titles:
 *                 type: integer
 *               matchesPlayed:
 *                 type: integer
 *               winPercentage:
 *                 type: number
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Retrieve all Tennis Players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const players = await TennisPlayer.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve players.' });
    }
});

/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Update a Tennis Player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The player ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               ranking:
 *                 type: integer
 *               country:
 *                 type: string
 *               titles:
 *                 type: integer
 *               matchesPlayed:
 *                 type: integer
 *               winPercentage:
 *                 type: number
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, ranking, country, titles, matchesPlayed, winPercentage } = req.body;

    if (!name || !age || !ranking || !country || !titles || !matchesPlayed || !winPercentage) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const player = await TennisPlayer.findByIdAndUpdate(id, req.body, { new: true });
        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update player.' });
    }
});

/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Delete a Tennis Player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The player ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const player = await TennisPlayer.findByIdAndDelete(id);
        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete player.' });
    }
});

module.exports = router;