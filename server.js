import express from 'express';
import cors from 'cors';
import mdxRoutes from "./SRC/routes/mdx.routes.js";


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Adjust this to your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes   
app.use('/api/mdx/archive', mdxRoutes);
app.use('/api/mdx', mdxRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});