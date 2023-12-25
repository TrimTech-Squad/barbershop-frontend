import {
  Breadcrumbs,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import fetchApi from "../../../helper/fetch";
import { Link } from "react-router-dom";

const ServiceColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "orderId", headerName: "Order ID", width: 150 },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "customerEmail", headerName: "Customer Email", width: 200 },
  { field: "kapsterName", headerName: "Kapster Name", width: 200 },
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
      console.log(params.value);
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

type AppointmentFetched = {
  user: {
    id: string;
    name: string;
    email: string;
    number: string;
  };
  kapsterService: {
    price: number;
    kapster: {
      name: string;
    };
    service: {
      name: string;
    };
  };
} & Appointment;

export const KapsterServiceContext = createContext<{
  kapsterServices: Appointment[];
  setKapsterServices: React.Dispatch<React.SetStateAction<Appointment[]>>;
}>({
  kapsterServices: [],
  setKapsterServices: () => {},
});

const Appointment = () => {
  const [rows, setRows] = useState<Appointment[]>([]);
  const [presistenRows, setPresistenRows] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");

  const location = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const getData = async () => {
      const res = await fetchApi("/appointment", "GET");

      const reshapedData = res.data.map((data: AppointmentFetched) => {
        const { id, date, status, orderId, user, kapsterService, time } = data;
        return {
          id,
          date,
          status,
          orderId,
          time,
          serviceName: kapsterService.service.name,
          kapsterName: kapsterService.kapster.name,
          customer: user.name,
          price: kapsterService.price,
          customerEmail: user.email,
          customerNumber: user.number,
        };
      });

      setRows(reshapedData);
      setPresistenRows(reshapedData);
    };
    getData();
  }, [location]);

  useEffect(() => {
    const filteredData = presistenRows.filter(
      (row) =>
        row.orderId.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search.toLowerCase()) ||
        row.customer.toLowerCase().includes(search.toLowerCase())
    );
    setRows(filteredData);
  }, [search, presistenRows]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>

        <Typography
          color="text.primary"
          variant="h6"
          fontWeight="bold"
          textTransform="capitalize"
        >
          Appointments
        </Typography>
      </Breadcrumbs>
      <KapsterServiceContext.Provider
        value={{
          kapsterServices: presistenRows,
          setKapsterServices: setPresistenRows,
        }}
      >
        <Outlet />
      </KapsterServiceContext.Provider>
      <Typography variant="h5" fontWeight="bold">
        Appointments
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
    </>
  );
};

export default Appointment;
