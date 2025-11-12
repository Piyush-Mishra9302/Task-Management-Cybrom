import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import AdminDashboard from "./admin/AdminDashboard";
import CreateUser from "./admin/CreateUser";
import ManageUser from "./admin/ManageUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeDashboard from "./employee/EmployeeDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="admin-dashboard" element={<AdminDashboard />}>
            <Route path="create-user" element={<CreateUser />} />
            <Route path="manage-users" element={<ManageUser />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>

    
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default App;
