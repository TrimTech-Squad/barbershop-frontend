import {
  Breadcrumbs,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Stack,
  IconButton,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import fetchApi from "../../../helper/fetch";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Actions = ({ id, description, serviceName, isActive }: Service) => {
  const [isActiveService, setIsActiveService] = useState(isActive);

  const changeStatus = async () => {
    if (isActiveService === isActive) return;
    try {
      await fetchApi(`/services/${id}`, "PUT", {
        id,
        description,
        serviceName,
        isActive: isActiveService,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    changeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveService]);

  return (
    <Switch
      checked={isActiveService}
      onChange={(e) => setIsActiveService(e.target.checked)}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

const ServiceColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "serviceName",
    headerName: "Name",
    width: 300,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "status",
    headerName: "Active",
    width: 150,
    renderCell: ({ row }) => {
      return <Actions {...row} />;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: ({ row }) => {
      return (
        <Link
          to={`/admin/services/edit?id=${row.id}&name=${row.serviceName}&description=${row.description}&isactive=${row.isActive}`}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      );
    },
  },
];

type Service = {
  id: number;
  serviceName: string;
  description: string;
  isActive: boolean;
};

export const ServicesContext = createContext<{
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}>({
  services: [],
  setServices: () => {},
});

export const Service = () => {
  const [rows, setRows] = useState<Service[]>([]);
  const [presistenRows, setPresistenRows] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetchApi("/services?all=true", "GET");
      setRows(res.data);
      setPresistenRows(res.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const filteredData = presistenRows.filter(
      (row) =>
        row.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search.toLowerCase())
    );
    setRows(filteredData);
  }, [search, presistenRows]);

  const location = useLocation().pathname.split("/")[3];

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        {location && (
          <Link color="inherit" to="/admin/kapsters">
            Kapsters
          </Link>
        )}
        <Typography
          color="text.primary"
          variant="h6"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {!location ? "Kapsters" : location}
        </Typography>
      </Breadcrumbs>
      <ServicesContext.Provider
        value={{ services: presistenRows, setServices: setPresistenRows }}
      >
        <Outlet />
      </ServicesContext.Provider>
      <Typography variant="h5" fontWeight="bold">
        Services
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ marginTop: 2 }}
      >
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Service"
          sx={{ width: "20rem" }}
          size="small"
        />
        <Link to="/admin/add-service">
          <Button variant="contained" color="primary">
            Add Service
          </Button>
        </Link>
      </Stack>
      <DataGrid
        rows={rows}
        columns={ServiceColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
      />
    </>
  );
};
