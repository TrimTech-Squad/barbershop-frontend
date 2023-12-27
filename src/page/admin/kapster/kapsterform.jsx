import {
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fetchApi from "../../../helper/fetch";
import { useContext } from "react";
import { KapstersContext } from "./kapster";

import "./kapster.css";

const KapsterForm = () => {
  const [kapsterName, setKapsterName] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();

  const kapsterContext = useContext(KapstersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newKapster = {
      name: kapsterName,
      gender: gender,
      specialization: specialization,
      status: "Available",
    };

    try {
      const response = await fetchApi("/kapsters", "POST", newKapster);

      kapsterContext.setKapsters([...kapsterContext.kapsters, response.data]);
      setKapsterName("");
      setGender("");
      setSpecialization("");

      navigate("/admin/kapsters");
    } catch (error) {
      console.error("Error adding kapster:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Add Kapster
      </Typography>
      <form onSubmit={handleSubmit} style={{ padding: 0 }}>
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
              <FormControlLabel value="Man" control={<Radio />} label="Man" />
              <FormControlLabel
                value="Woman"
                control={<Radio />}
                label="Woman"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Specialization"
              fullWidth
              required
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Add Kapster
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default KapsterForm;
