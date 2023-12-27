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
import { FormEventHandler, useEffect, useState } from "react";
import fetchApi from "../../../helper/fetch";
import { useContext } from "react";
import { KapstersContext } from "./kapster";

import "./kapster.css";
import useQuery from "../../../helper/query";

const KapsterEditForm = () => {
  const query = useQuery();
  const [kapsterName, setKapsterName] = useState(query.get("name"));
  const [gender, setGender] = useState(query.get("gender"));
  const [specialization, setSpecialization] = useState(
    query.get("specialization")
  );
  const navigate = useNavigate();

  const kapsterContext = useContext(KapstersContext);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const updateKapster: {
      id: number;
      name: string;
      gender: string;
      specialization: string;
      status: "Available" | "Not Available" | "Resigned";
    } = {
      id: parseInt(query.get("id") ?? "-1"),
      name: kapsterName ?? "",
      gender: gender ?? "",
      specialization: specialization ?? "",
      status:
        (query.get("status") as "Available" | "Not Available" | "Resigned") ??
        "Avaiable",
    };

    try {
      await fetchApi("/kapsters/" + query.get("id"), "PUT", updateKapster);
      kapsterContext.setKapsters((prevKapsters) => {
        const kapsters = [...prevKapsters];
        const index = kapsters.findIndex(
          (kapster) => kapster.id === updateKapster.id
        );
        kapsters[index] = updateKapster;
        return kapsters;
      });

      setKapsterName("");
      setGender("");
      setSpecialization("");

      navigate("/admin/kapsters");
    } catch (error) {
      alert("Error updating kapster");
    }
  };

  useEffect(() => {
    setGender(query.get("gender"));
    setKapsterName(query.get("name"));
    setSpecialization(query.get("specialization"));
  }, [query]);

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Edit Kapster
      </Typography>
      <form onSubmit={handleSubmit} style={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item sx={{ padding: 1 }} xs={12}>
            <FormLabel component="legend">ID</FormLabel>
            <TextField required value={query.get("id")} disabled />
          </Grid>
          <Grid item sx={{ padding: 1 }} xs={12}>
            <TextField
              label="Name"
              fullWidth
              required
              value={kapsterName}
              onChange={(e) => setKapsterName(e.target.value)}
            />
          </Grid>
          <Grid item sx={{ padding: 1 }} xs={12}>
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
          <Grid item sx={{ padding: 1 }} xs={12}>
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
          <Grid item sx={{ padding: 1 }} xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Update Kapster
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default KapsterEditForm;
