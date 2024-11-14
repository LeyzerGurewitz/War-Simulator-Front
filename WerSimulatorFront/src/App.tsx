import "./App.css";
import Login from "./pages/login/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import NavBar from "./components/navBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
       
      </Routes>
    </>
  );
}

export default App;
