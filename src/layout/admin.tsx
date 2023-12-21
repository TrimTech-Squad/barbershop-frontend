import { Dashboard, People, Search } from "@mui/icons-material";
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
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
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
      keepMounted={true}
      variant="permanent"
      sx={{
        width: "15rem",
      }}
    >
      <List sx={{ width: "15rem" }}>
        <ListItem>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>
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
