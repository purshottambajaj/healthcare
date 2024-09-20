const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sample JSON Data
let services = [
  { id: 1, name: 'General Checkup', description: 'Basic health checkup', price: 50 },
  { id: 2, name: 'Dental Cleaning', description: 'Teeth cleaning and polish', price: 100 },
  { id: 3, name: 'Vaccination', description: 'Routine vaccines', price: 30 },
];

// GET: Retrieve all services
app.get('/services', (req, res) => {
  res.json(services);
});

// POST: Add a new service
app.post('/services', (req, res) => {
  const newService = req.body;
  newService.id = services.length > 0 ? services[services.length - 1].id + 1 : 1; // Ensure unique ID
  services.push(newService);
  res.status(201).json(newService);
});


// PUT: Update a service
app.put('/services/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedService = req.body;
  const serviceIndex = services.findIndex(service => service.id === id);

  if (serviceIndex !== -1) {
    services[serviceIndex] = { id, ...updatedService };
    res.json(services[serviceIndex]);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

// DELETE: Delete a service
app.delete('/services/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  services = services.filter((service) => service.id !== id);
  res.status(204).send();
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
