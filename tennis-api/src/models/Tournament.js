const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    surface: { type: String, required: true },
    prizeMoney: { type: Number, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TennisPlayer' }],
});

module.exports = mongoose.model('Tournament', TournamentSchema);