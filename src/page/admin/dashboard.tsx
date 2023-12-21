import {
  Typography,
  Link,
  Stack,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Dashboard</Typography>
      </Breadcrumbs>
      <Stack spacing={2} direction="row" justifyContent="space-evenly">
        <Card
          sx={{
            position: "relative",
            padding: 1,
            minWidth: "15rem",
            minHeight: "10rem",
          }}
        >
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              Total View
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              100
            </Typography>
            <Stack direction="row" alignItems="center">
              <ArrowDownwardIcon sx={{ color: "red" }} />
              <Typography variant="body2" color="red">
                12%{" "}
              </Typography>
              <Typography variant="body2"> since last month</Typography>
            </Stack>
          </CardContent>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              height: "3rem",
              width: "3rem",
            }}
          >
            V
          </Avatar>
        </Card>
        <Card
          sx={{
            position: "relative",
            padding: 1,
            minWidth: "15rem",
            minHeight: "10rem",
          }}
        >
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              Total View
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              100
            </Typography>
            <Stack direction="row" alignItems="center">
              <ArrowDownwardIcon sx={{ color: "red" }} />
              <Typography variant="body2" color="red">
                12%{" "}
              </Typography>
              <Typography variant="body2"> since last month</Typography>
            </Stack>
          </CardContent>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              height: "3rem",
              width: "3rem",
            }}
          >
            V
          </Avatar>
        </Card>
        <Card
          sx={{
            position: "relative",
            padding: 1,
            minWidth: "15rem",
            minHeight: "10rem",
          }}
        >
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              Total View
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              100
            </Typography>
            <Stack direction="row" alignItems="center">
              <ArrowDownwardIcon sx={{ color: "red" }} />
              <Typography variant="body2" color="red">
                12%{" "}
              </Typography>
              <Typography variant="body2"> since last month</Typography>
            </Stack>
          </CardContent>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              height: "3rem",
              width: "3rem",
            }}
          >
            V
          </Avatar>
        </Card>
        <Card
          sx={{
            position: "relative",
            padding: 1,
            minWidth: "15rem",
            minHeight: "10rem",
          }}
        >
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              Total View
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              100
            </Typography>
            <Stack direction="row" alignItems="center">
              <ArrowDownwardIcon sx={{ color: "red" }} />
              <Typography variant="body2" color="red">
                12%{" "}
              </Typography>
              <Typography variant="body2"> since last month</Typography>
            </Stack>
          </CardContent>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              position: "absolute",
              top: "1rem",
              right: "1rem",
              height: "3rem",
              width: "3rem",
            }}
          >
            V
          </Avatar>
        </Card>
      </Stack>
    </>
  );
};

export default Dashboard;
