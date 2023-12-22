import {
  TextField,
  Stack,
  Button,
  Select,
  MenuItem,
  FormLabel,
  FormControl,
} from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import fetchApi from "../../../helper/fetch";
import { useNavigate } from "react-router-dom";
import { Service } from "../../landingpage";
import { Kapster } from "../kapster/kapster";

const AddKapsterService = () => {
  const navigate = useNavigate();

  const [kapsters, setKapsters] = useState<Kapster[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const createService: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newService = {
      serviceId: formData.get("serviceId"),
      kapsterId: formData.get("kapsterId"),
      price: formData.get("price"),
    };
    try {
      await fetchApi(`/kapster-service`, "POST", newService);

      navigate("/admin/kapsterservice");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchKapsters = async () => {
      try {
        const kapsters = await fetchApi(`/kapsters`, "GET");
        setKapsters(kapsters.data);

        const services = await fetchApi("/services", "GET");
        setServices(services.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchKapsters();
  }, []);

  return (
    <>
      <form style={{ padding: 0 }} onSubmit={createService}>
        <Stack spacing={3} justifyContent="flex-start" width="100%">
          {/* <OutlinedInput
            startAdornment={
              <InputAdornment position="start">ID</InputAdornment>
            }
            value={query.get("id") || ""}
            placeholder="Search Service"
            disabled
          /> */}
          <FormControl>
            <FormLabel sx={{ textAlign: "left", mb: 1 }}>
              Service (availbale services)
            </FormLabel>
            <Select name="serviceId">
              {services.map((service) => (
                <MenuItem value={service.id}>{service.serviceName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel sx={{ textAlign: "left", mb: 1 }}>
              Kapster (availbale kapsters)
            </FormLabel>
            <Select name="kapsterId">
              {kapsters.map((kapster) => (
                <MenuItem value={kapster.id}>{kapster.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel sx={{ textAlign: "left", mb: 1 }}>
              Price (in Rupiah)
            </FormLabel>
            <TextField
              name="price"
              id="outlined-basic"
              variant="outlined"
              type="number"
            />
          </FormControl>
          <Button type="submit" variant="outlined">
            Create Kapster Service
          </Button>
        </Stack>
      </form>
      <br />
    </>
  );
};

export default AddKapsterService;
