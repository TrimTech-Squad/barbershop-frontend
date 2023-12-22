// import logo from './logo.svg';
import "./App.css";
import { Login } from "./page/login/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./page/register/Register";
import Auth from "./hooks/auth";
import AdminLayout from "./layout/admin";
import Dashboard from "./page/admin/dashboard";
import { Kapster } from "./page/admin/kapster/kapster";
import { Service } from "./page/admin/service/service";
import LandingPage from "./page/landingpage";
import ServiceForm from "./page/admin/service/serviceform";
import KapsterForm from "./page/admin/kapster/kapsterform";
import KapsterEditForm from "./page/admin/kapster/edit";
import EditService from "./page/admin/service/edit";
import { KapsterService } from "./page/admin/kapsterService";
import AddKapsterService from "./page/admin/kapsterService/add";
import EditKapsterService from "./page/admin/kapsterService/edit";
import Appointment from "./page/admin/appointment";

function App() {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-service" element={<ServiceForm />} />
          <Route path="services" element={<Service />}>
            <Route path="edit" element={<EditService />} />
          </Route>
          <Route path="add-service" element={<ServiceForm />} />
          <Route path="kapsters" element={<Kapster />}>
            <Route path="Add" element={<KapsterForm />} />
            <Route path="edit" element={<KapsterEditForm />} />
          </Route>
          <Route path="kapsterservice" element={<KapsterService />}>
            <Route path="add" element={<AddKapsterService />} />
            <Route path="edit" element={<EditKapsterService />} />
          </Route>
          <Route path="appointment" element={<Appointment />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
