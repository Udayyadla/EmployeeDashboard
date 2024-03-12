import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmployeeTable from "./pages/EmployeeTable";
import EditEmployee from "./pages/EditEmployee";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/employees" element={<EmployeeTable />} />
      <Route path="/editEmployee" element={<EditEmployee />} />
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
