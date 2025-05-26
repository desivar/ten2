const express = require('express');
const connectDB = require('./config/database');
const playerRoutes = require('./routes/playerRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Setup Swagger
setupSwagger(app);

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});