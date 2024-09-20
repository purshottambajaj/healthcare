import React from 'react';

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Services List</h3>
      <ul className="list-group">
        {services.map((service) => (
          <li className="list-group-item" key={service.id}>
            <div>
              <strong>{service.name}</strong> - {service.description} (${service.price})
            </div>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => onEdit(service.id)} // Pass the correct ID
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(service.id)} // Pass the correct ID
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
