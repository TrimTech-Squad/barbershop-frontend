import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

import "./serviceform.css";
import fetchApi from "../../../helper/fetch";
import { ServicesContext } from "./service";

const ServiceForm = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const navigate = useNavigate();

  const servicesContext = useContext(ServicesContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newService = {
      serviceName: serviceName,
      description: serviceDescription,
    };

    try {
      const res = await fetchApi("/services", "POST", newService);
      servicesContext.setServices([...servicesContext.services, res.data]);
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddServiceClick = () => {
    navigate("/admin/add-service");
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
              <Button
                type="submit"
                variant="outlined"
                onClick={handleAddServiceClick}
                fullWidth
              >
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
