
import { Routes, Route,Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Employee Dashboard
          </Link>

          <div className="navbar-nav">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>

            <Link className="nav-link text-white" to="/add-employee">
              Employee Form
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add-employee"
            element={<EmployeeForm />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
