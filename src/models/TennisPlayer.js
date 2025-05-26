const mongoose = require('mongoose');

const TennisPlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    ranking: { type: Number, required: true },
    country: { type: String, required: true },
    titles: { type: Number, required: true },
    matchesPlayed: { type: Number, required: true },
    winPercentage: { type: Number, required: true },
});

module.exports = mongoose.model('TennisPlayer', TennisPlayerSchema);