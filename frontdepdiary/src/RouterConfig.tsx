import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {LoginPage} from "./Components/Login_Auth/Login/LoginPage";
import {Registration} from "./Components/Login_Auth/Registration/Registration";
import {NotFoundPage} from "./Components/MainComponents/NotFoundPage";
import {Dashboard} from "./Components/MainComponents/Dashboard/Dashboard";
import {AdminLogIn} from "./Components/MainComponents/Admin/AdminLogIn";
import {AdminDashboard} from "./Components/MainComponents/Admin/AdminDashboard";

export const RouterConfig = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminLogin" element={<AdminLogIn />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};
