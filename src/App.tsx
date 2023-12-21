// import logo from './logo.svg';
import "./App.css";
import { Login } from "./page/login/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./page/register/Register";
import Auth from "./hooks/auth";
import AdminLayout from "./layout/admin";
import Dashboard from "./page/admin/dashboard";
import { Service } from "./page/admin/service";
import LandingPage from "./page/landingpage";

function App() {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<Service />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
