import {
  TextField,
  Stack,
  Button,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import useQuery from "../../../helper/query";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import fetchApi from "../../../helper/fetch";
import { ServicesContext } from "./service";
import { useNavigate } from "react-router-dom";

const EditService = () => {
  const query = useQuery();

  const servicesContext = useContext(ServicesContext);

  const [description, setDescription] = useState(
    query.get("description") || ""
  );

  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState(query.get("name") || "");

  const updateService: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const updateService = {
      id: parseInt(query.get("id") || ""),
      description,
      serviceName,
      isActive: query.get("isactive") === "true" ? true : false,
    };
    try {
      await fetchApi(`/services/${query.get("id")}`, "PUT", updateService);
      servicesContext?.setServices((prev) => {
        const index = prev.findIndex(
          (service) => service.id === updateService.id
        );
        const newServices = [...prev];
        newServices[index] = updateService;
        return [...newServices];
      });
      navigate("/admin/services");
    } catch (error) {
    alert("Error updating service");
    }
  };

  useEffect(() => {
    setDescription(query.get("description") || "");
    setServiceName(query.get("name") || "");
  }, [query]);

  return (
    <>
      <form style={{ padding: 0 }} onSubmit={updateService}>
        <Stack spacing={3} justifyContent="flex-start" width="100%">
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">ID</InputAdornment>
            }
            value={query.get("id") || ""}
            placeholder="Search Service"
            disabled
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            multiline
            rows={4}
            value={description}
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="outlined">
            Update Service
          </Button>
        </Stack>
      </form>
      <br />
    </>
  );
};

export default EditService;
