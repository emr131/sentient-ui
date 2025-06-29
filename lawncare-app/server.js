const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load services from services.json
const servicesFile = path.join(__dirname, 'services.json');
let services = [];
if (fs.existsSync(servicesFile)) {
  services = JSON.parse(fs.readFileSync(servicesFile));
}

// Bookings stored in memory for demo purposes
const bookings = [];

// Get available services
app.get('/api/services', (req, res) => {
  res.json(services);
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const booking = {
    id: bookings.length + 1,
    name: req.body.name,
    email: req.body.email,
    service: req.body.service,
    date: req.body.date,
  };
  bookings.push(booking);
  res.status(201).json(booking);
});

// Simple list bookings endpoint
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Lawncare app running on http://localhost:${PORT}`);
});
