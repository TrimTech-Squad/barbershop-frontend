import {
  Breadcrumbs,
  Typography,
  Link,
  OutlinedInput,
  InputAdornment,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../../helper/fetch";

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
];

type Service = {
  id: number;
  serviceName: string;
  description: string;
};

export const Service = () => {
  const [rows, setRows] = useState<Service[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetchApi("/services", "GET");
      setRows(res.data);
    };
    getUsers();
  }, []);

  const handleFormService = () => {
    navigate('/admin/add-service'); // Navigasi ke halaman form saat tombol tambah diklik
  };


  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Services</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight="bold">
        Services
      </Typography>
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search Service"
        sx={{ width: "20rem" }}
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleFormService}>
        Tambah Service
      </Button>
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
