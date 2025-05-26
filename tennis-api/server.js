// In C:\Users\jilli\ten2\ten2\tennis-api\server.js
const connectDB = require('./src/config/database');
const playerRoutes = require('./src/routes/playerRoutes');
const tournamentRoutes = require('./src/routes/tournamentRoutes');
const setupSwagger = require('./swagger'); // swagger.js is also at the root

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
