import {
  TextField,
  Stack,
  Button,
  FormLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import fetchApi from "../../../helper/fetch";
import { useNavigate } from "react-router-dom";

import useQuery from "../../../helper/query";

const EditKapsterService = () => {
  const navigate = useNavigate();

  const query = useQuery();

  const [price, setPrice] = useState<number>(
    parseInt(query.get("price") || "0")
  );

  const createService: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newService = {
      isActive: query.get("isActive") === "true" ? true : false,
      price: price,
    };
    try {
      await fetchApi(`/kapster-service/${query.get("id")}`, "PUT", newService);

      navigate("/admin/kapsterservice");
    } catch (error) {
      alert("Error creating service");
    }
  };

  useEffect(() => {
    setPrice(parseInt(query.get("price") || "0"));
  }, [query]);

  return (
    <>
      <form style={{ padding: 0 }} onSubmit={createService}>
        <Stack spacing={3} justifyContent="flex-start" width="100%">
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">ID</InputAdornment>
            }
            value={query.get("id") || ""}
            placeholder="Search Service"
            disabled
          />

          <FormControl>
            <FormLabel sx={{ textAlign: "left", mb: 1 }}>
              Price (in Rupiah)
            </FormLabel>
            <TextField
              name="price"
              id="outlined-basic"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </FormControl>
          <Button type="submit" variant="outlined">
            Update Kapster Service
          </Button>
        </Stack>
      </form>
      <br />
    </>
  );
};

export default EditKapsterService;
