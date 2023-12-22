import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

import './serviceform.css';

const ServiceForm = ({ onSubmit }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      id: Math.floor(Math.random() * 1000),
      serviceName: serviceName,
      description: serviceDescription,
    };

    onSubmit(newService);

    navigate('/admin/services');

    const existingServices = JSON.parse(localStorage.getItem('services')) || [];
    const updatedServices = [...existingServices, newService];
    localStorage.setItem('services', JSON.stringify(updatedServices));

    setServiceName('');
    setServiceDescription('');
  };

  const handleAddServiceClick = () => {
    navigate('/admin/add-service');
  };

  return (
    <div className="service-form-container">
      <Paper elevation={3} className="service-form-paper">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Add Service
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                required
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="button" variant="outlined" onClick={handleAddServiceClick} fullWidth>
                Add Service
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default ServiceForm;
