import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceList from './Components/ServiceList';
import ServiceForm from './Components/ServiceForm';

const App = () => {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch services from the API
  useEffect(() => {
    fetch('/services')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  // Add a new service
  const addService = (service) => {
    fetch('/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    })
      .then((response) => response.json())
      .then((newService) => {
        setServices([...services, newService]);
      })
      .catch((error) => console.error('Error adding service:', error));
  };

  // Update an existing service
  const updateService = (service) => {
    fetch(`/services/${editIndex}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    })
      .then((response) => response.json())
      .then((updatedService) => {
        const updatedServices = services.map((s) =>
          s.id === updatedService.id ? updatedService : s
        );
        setServices(updatedServices);
        setEditIndex(null);
      });
  };

  // Handle add/update logic
  const addOrUpdateService = (service) => {
    if (editIndex !== null) {
      updateService(service);
    } else {
      addService(service);
    }
    setCurrentService(null);
  };

  // Edit a service
  const editService = (id) => {
    const service = services.find((service) => service.id === id);
    if (service) {
      setCurrentService(service); // Set the correct service for editing
      setEditIndex(id); // Save the correct service ID
    }
  };
  
  // Delete a service
  const deleteService = (id) => {
    fetch(`/services/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setServices(services.filter((service) => service.id !== id)); // Update the list correctly
      })
      .catch((error) => console.error('Error deleting service:', error));
  };
  

  return (
    <div className="container">
      <h1 className="mt-5">Healthcare Services</h1>
      <ServiceForm onSubmit={addOrUpdateService} currentService={currentService} />
      <ServiceList services={services} onEdit={editService} onDelete={deleteService} />
    </div>
  );
};

export default App;
