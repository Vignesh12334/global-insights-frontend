import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./layout";
import Dashboard from "./pages/dashboard";
import Insights from "./pages/insights";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route index element={<Dashboard />} />

          <Route path="insights" element={<Insights />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
