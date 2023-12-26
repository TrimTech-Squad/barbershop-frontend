import {
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Stack,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import fetchApi from "../helper/fetch";

const ServiceColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "orderId", headerName: "Order ID", width: 150 },

  {
    field: "time",
    headerName: "Appointment Date",
    width: 200,
    renderCell: (params) => {
      return new Date(params.value as string).toLocaleString();
    },
  },
  {
    field: "date",
    headerName: "Transaction Date",
    width: 200,
    renderCell: (params) => {
      return new Date(params.value as string).toLocaleString();
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => {
      if (params.value === "Booked")
        return (
          <Button color="info" variant="outlined">
            {params.value}
          </Button>
        );
      if (params.value === "Canceled")
        return (
          <Button color="error" variant="outlined">
            {params.value}
          </Button>
        );
      if (params.value === "Completed")
        return (
          <Button color="success" variant="outlined">
            {params.value}
          </Button>
        );
    },
  },
];

type Appointment = {
  id: string;
  orderId: string;
  date: string;
  time: string;
  status: string;
  customer: string;
};

export const KapsterServiceContext = createContext<{
  kapsterServices: Appointment[];
  setKapsterServices: React.Dispatch<React.SetStateAction<Appointment[]>>;
}>({
  kapsterServices: [],
  setKapsterServices: () => {},
});

const UserProfile = () => {
  const [rows, setRows] = useState<Appointment[]>([]);
  const [presistenRows, setPresistenRows] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");

  const location = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const getData = async () => {
      const res = await fetchApi("/appointment/user", "GET");
      setRows(res.data);
      setPresistenRows(res.data);
    };
    getData();
  }, [location]);

  useEffect(() => {
    const filteredData = presistenRows.filter(
      (row) =>
        row.orderId.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search.toLowerCase())
    );
    setRows(filteredData);
  }, [search, presistenRows]);

  return (
    <Box sx={{ padding: "5rem" }}>
      <Typography variant="h5" fontWeight="bold">
        User Appointments
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ marginY: "2rem" }}
      >
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search KapsterService"
          sx={{ width: "20rem" }}
          size="small"
        />
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
    </Box>
  );
};

export default UserProfile;
