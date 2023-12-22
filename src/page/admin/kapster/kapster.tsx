import { useState, useEffect, createContext } from "react";
import {
  Breadcrumbs,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Stack,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import fetchApi from "../../../helper/fetch";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import "./kapster.css";
import { Outlet, useLocation } from "react-router-dom";

const Actions = ({ status, gender, id, name, specialization }: Kapster) => {
  const [statusKapster, setStatusKapster] = useState(status);

  const changeStatus = async () => {
    if (statusKapster === status) return;
    try {
      await fetchApi(`/kapsters/${id}`, "PUT", {
        id,
        gender,
        name,
        specialization,
        status: statusKapster,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    changeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusKapster]);

  console.log(gender);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems={"center"}
      spacing={2}
      width="150px"
    >
      <Link
        to={`/admin/kapsters/edit?id=${id}&name=${name}&gender=${gender}&specialization=${specialization}&status=${status}`}
        className="link"
      >
        <IconButton
          aria-label="upload picture"
          component="span"
          size="small"
          sx={{ flexShrink: 0 }}
        >
          <EditIcon />
        </IconButton>
      </Link>
      <Select
        value={statusKapster}
        sx={{ width: "100%" }}
        onChange={(e) =>
          setStatusKapster(
            e.target.value as "Available" | "Not Available" | "Resigned"
          )
        }
      >
        <MenuItem value="Available">Avaiable</MenuItem>
        <MenuItem value="Not Available">Not Available</MenuItem>
        <MenuItem value="Resigned">Resigned</MenuItem>
      </Select>
    </Stack>
  );
};

const KapsterColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 150,
  },
  {
    field: "specialization",
    headerName: "Specialization",
    width: 300,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: ({ row }) => {
      return <Actions {...row} />;
    },
  },
];

export type Kapster = {
  id: number;
  name: string;
  gender: string;
  specialization: string;
  status: "Available" | "Not Available" | "Resigned";
};

export const KapstersContext = createContext<{
  kapsters: Kapster[];
  setKapsters: React.Dispatch<React.SetStateAction<Kapster[]>>;
}>({
  kapsters: [],
  setKapsters: () => {},
});

export const Kapster = () => {
  const [rows, setRows] = useState<Kapster[]>([]);
  const [presistenRows, setPresistenRows] = useState<Kapster[]>([]);
  const [search, setSearch] = useState("");

  const location = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi("/kapsters?all=true", "GET");
        setRows(response.data);
        setPresistenRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = presistenRows.filter(
      (row) =>
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search.toLowerCase())
    );
    setRows(filteredData);
  }, [search, presistenRows]);

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
      {/* context */}
      <KapstersContext.Provider
        value={{ kapsters: presistenRows, setKapsters: setPresistenRows }}
      >
        <Outlet />
      </KapstersContext.Provider>
      <br />
      <Typography variant="h5" fontWeight="bold">
        Kapsters
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
        <Link to="/admin/kapsters/add">
          <Button variant="contained" color="primary">
            Tambah Kapster
          </Button>
        </Link>
      </Stack>
      <DataGrid
        rows={rows}
        columns={KapsterColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </>
  );
};

export default Kapster;
