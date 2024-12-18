import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './app/routes/UserRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static('public'));

export default app;