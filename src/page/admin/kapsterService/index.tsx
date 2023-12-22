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

const Actions = ({ id, price, isActive }: KapsterService) => {
  const [isActiveService, setIsActiveService] = useState(isActive);

  const changeStatus = async () => {
    if (isActiveService === isActive) return;
    try {
      await fetchApi(`/kapster-service/${id}`, "PUT", {
        id,
        price,
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
    headerName: "Service Name",
    width: 300,
  },
  {
    field: "kapsterName",
    headerName: "Kapster Name",
    width: 300,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 300,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
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
      console.log(row);
      return (
        <Link
          to={`/admin/kapsterservice/edit?id=${row.id}&isActive=${row.isActive}&price=${row.price}`}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      );
    },
  },
];

type KapsterService = {
  kapsterName: string;
  serviceName: string;
  id: number;
  price: number;
  isActive: boolean;
};

type KapsterServiceFetch = {
  service?: {
    id: number;
    serviceName: string;
  };
  kapster?: {
    id: number;
    name: string;
    gender: string;
  };
} & KapsterService;

export const KapsterServiceContext = createContext<{
  kapsterServices: KapsterService[];
  setKapsterServices: React.Dispatch<React.SetStateAction<KapsterService[]>>;
}>({
  kapsterServices: [],
  setKapsterServices: () => {},
});

export const KapsterService = () => {
  const [rows, setRows] = useState<KapsterService[]>([]);
  const [presistenRows, setPresistenRows] = useState<KapsterService[]>([]);
  const [search, setSearch] = useState("");

  const location = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const getData = async () => {
      const res = await fetchApi("/kapster-service", "GET");

      const reshapedData = res.data.map((data: KapsterServiceFetch) => {
        const { service, kapster, ...rest } = data;
        return {
          ...rest,
          serviceName: service?.serviceName,
          kapsterName: kapster?.name,
          idService: service?.id,
          idKapster: kapster?.id,
          gender: kapster?.gender,
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
        row.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toString().includes(search.toLowerCase()) ||
        row.kapsterName.toLowerCase().includes(search.toLowerCase())
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
          <Link color="inherit" to="/admin/services">
            Kapster Services
          </Link>
        )}
        <Typography
          color="text.primary"
          variant="h6"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {!location ? "Kapster Services" : location}
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
        Kapster Services
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
        <Link to="./add">
          <Button variant="contained" color="primary">
            Add KapsterService
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
