require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Base URL route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>API Status</title>
      <style>
        body {
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          background: #fff;
          padding: 30px 50px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 { color: #e63946; }
        p { color: #333; font-size: 1.1rem; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 API is Running</h1>
        <p>Welcome to the Ankur ScholarHub API backend.<br>
        Use <code>/api/auth</code> for authentication routes.</p>
      </div>
    </body>
    </html>
  `);
});


// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
