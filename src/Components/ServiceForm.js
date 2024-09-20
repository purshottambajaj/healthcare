import React, { useState, useEffect } from 'react';

const ServiceForm = ({ onSubmit, currentService }) => {
    const [service, setService] = useState({
      name: '',
      description: '',
      price: '',
    });
  
    useEffect(() => {
      if (currentService) {
        setService({
          name: currentService.name,
          description: currentService.description,
          price: currentService.price,
        });
      } else {
        setService({
          name: '',
          description: '',
          price: '',
        });
      }
    }, [currentService]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setService({ ...service, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(service); // Submit the form data (add or update)
      setService({ name: '', description: '', price: '' }); // Reset the form
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={service.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={service.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={service.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          {currentService ? 'Update Service' : 'Add Service'}
        </button>
      </form>
    );
  };
  
  export default ServiceForm;
  
