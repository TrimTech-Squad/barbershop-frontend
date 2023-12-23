import { People, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";
import useAuth from "../hooks/protected";
const AdminLayout = () => {
  const isAuthorized = useAuth({ role: "Admin" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/signin");
    }
  }, [isAuthorized]);

  return (
    <Stack direction="row" width="100%">
      <Sidebar />
      <Box width="100%">
        <Navbar />
        <Box padding="1rem">
          <Stack spacing={2}>
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      variant="permanent"
      sx={{
        width: "15rem",
      }}
    >
      <List sx={{ width: "15rem" }}>
        <Link
          to="/admin/appointment"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemIcon>
              <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText>Appointments</ListItemText>
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/admin/kapsters"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText>Manage Kapsters</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/admin/services"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText>Manage Services</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/admin/kapsterservice"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemIcon>
              <EngineeringIcon />
            </ListItemIcon>
            <ListItemText>Manage Assigments</ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export const Navbar = () => {
  return (
    <>
      <Stack
        component="header"
        direction="row"
        gap={3}
        width="100%"
        //   position="fixed"
        top="0"
        left="0"
        height="4rem"
        overflow="hidden"
        justifyContent="space-between"
        padding="1rem"
        boxSizing={"border-box"}
      >
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          label="Search"
        />
        <Stack direction="row" spacing={2}>
          <Avatar />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
};

export default AdminLayout;
