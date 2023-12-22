import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Typography, Link, OutlinedInput, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import fetchApi from "../../../helper/fetch";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import './kapster.css';

const KapsterColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 150,
  },
  {
    field: 'specialization',
    headerName: 'Specialization',
    width: 300,
  },
];

type Kapster = {
  id: number;
  name: string;
  gender: string;
  specialization: string;
};

export const Kapster = () => {
  const [rows, setRows] = useState<Kapster[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi('/kapsters', 'GET');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormKapster = () => {
    navigate('/admin/add-kapster'); // Navigasi ke halaman form saat tombol tambah diklik
  };



  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Kapsters</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight="bold">
        Kapsters
      </Typography>
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search Kapster"
        sx={{ width: '20rem' }}
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleFormKapster}>
        Tambah Kapster
      </Button>
      <DataGrid
        rows={rows}
        columns={KapsterColumns}
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

export default Kapster;
