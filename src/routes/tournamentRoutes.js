const express = require('express');
const Tournament = require('../models/Tournament');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tournaments
 *   description: Tournament management
 */

/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     summary: Create a new Tournament
 *     tags: [Tournaments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               surface:
 *                 type: string
 *               prizeMoney:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     summary: Retrieve all Tournaments
 *     tags: [Tournaments]
 *     responses:
 *       200:
 *         description: A list of tournaments
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tournaments.' });
    }
});

/**
 * @swagger
 * /api/tournaments/{id}:
 *   put:
 *     summary: Update a Tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The tournament ID
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
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               surface:
 *                 type: string
 *               prizeMoney:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *       404:
 *         description: Tournament not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, date, surface, prizeMoney } = req.body;

    if (!name || !location || !date || !surface || !prizeMoney) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const tournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true });
        if (!tournament) {
            return res.status(404).json({ error: 'Tournament not found.' });
        }
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tournament.' });
    }
});

/**
 * @swagger
 * /api/tournaments/{id}:
 *   delete:
 *     summary: Delete a Tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The tournament ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tournament deleted successfully
 *       404:
 *         description: Tournament not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndDelete(id);
        if (!tournament) {
            return res.status(404).json({ error: 'Tournament not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tournament.' });
    }
});

module.exports = router;