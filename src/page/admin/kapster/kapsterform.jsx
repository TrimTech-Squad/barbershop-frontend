
import { Typography, TextField, Button, Grid, Paper, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import fetchApi from '../../../helper/fetch';

import './kapster.css';

const KapsterForm = ({ onSubmit }) => {
  const [kapsterName, setKapsterName] = useState('');
  const [gender, setGender] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  const newKapster = {
    id: Math.floor(Math.random() * 1000),
    name: kapsterName,
    gender: gender,
    specialization: specialization,
  };

  try {
    const response = await fetchApi('/kapsters', 'POST', newKapster);
    console.log('Kapster added successfully:', response);
    onSubmit(newKapster);

    const existingKapsters = JSON.parse(localStorage.getItem('kapsters')) || [];
    const updatedKapsters = [...existingKapsters, newKapster];
    localStorage.setItem('kapsters', JSON.stringify(updatedKapsters));

    setKapsterName('');
    setGender('');
    setSpecialization('');

    navigate('/admin/kapsters');
  } catch (error) {
    console.error('Error adding kapster:', error);
  }
};

const handleAddKapsterClick = () => {
  navigate('/admin/add-kapster');


  
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Tambah Kapster
      </Typography>
      <Paper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                required
                value={kapsterName}
                onChange={(e) => setKapsterName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Specialization"
                fullWidth
                required
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <Button type="button" variant="outlined" onClick={handleAddKapsterClick} fullWidth>
                Add Service
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};
};

export default KapsterForm;
