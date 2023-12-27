import {
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Stack,
  Box,
  Modal,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, createContext, FormEventHandler } from "react";
import { useLocation } from "react-router-dom";
import fetchApi from "../helper/fetch";

const orderCancel: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(e.currentTarget);
    await fetchApi(`/order/${data.get("orderId")}/refund`, "POST", {
      reason: data.get("reason"),
      amount: data.get("amount"),
    });
    alert(
      "Request Cancelation has been sent to admin, please wait for approval"
    );
  } catch (e) {
    alert("Something went wrong");
  }
};

const Action = ({
  id,
  status,
  gross_amount,
}: {
  id: string;
  status: string;
  gross_amount: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {status === "Booked" && (
        <>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Cancel Booking
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <form action="" onSubmit={orderCancel}>
              <Stack spacing={2} sx={{ padding: "2rem", width: "100%" }}>
                <Typography
                  textAlign="left"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  mb={2}
                >
                  Request Cancelation Form
                </Typography>
                <Input name="orderId" value={id} type="hidden" />
                <Input
                  fullWidth
                  placeholder="Reason"
                  multiline
                  rows={4}
                  required
                  name="reason"
                />
                <Input
                  fullWidth
                  placeholder="Amount"
                  type="number"
                  required
                  name="amount"
                  sx={{ mb: 4 }}
                  inputProps={{ min: 0, max: gross_amount }}
                />
                <Button type="submit" variant="contained" color="error">
                  Submit
                </Button>
              </Stack>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

const ServiceColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "orderId", headerName: "Order ID", width: 200 },
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
    field: "redirect_url",
    headerName: "Payment",
    width: 150,
    renderCell: (params) => {
      return (
        <Button
          variant="outlined"
          color="primary"
          href={params.value as string}
          target="_blank"
        >
          Payment Link
        </Button>
      );
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
      if (params.value === "Cancelled")
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
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <Action
          id={params.row.orderId}
          status={params.row.status}
          gross_amount={params.row.order.gross_amount}
        />
      );
    },
  },
];

type Appointment = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
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

      const mappedData = res.data.map((row: Appointment) => {
        return {
          ...row,
          id: row.id,
          orderId: row.orderId,
          date: row.date,
          time: row.time,
          status: row.status,
          customer: row.customer,
          redirect_url: row.order.redirect_url,
        };
      });

      setRows(mappedData);
      setPresistenRows(mappedData);
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
