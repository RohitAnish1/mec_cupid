import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import ApproveRegistrations from "./components/ApproveRegistrations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/approve" element={<ApproveRegistrations />} />
      </Routes>
    </Router>
  );
}

export default App;
