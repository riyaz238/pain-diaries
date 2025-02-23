import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/navbar";
import HomePage from "./pages/home";
import HistoryPage from "./pages/history";
import AddNewPage from "./pages/addNew";
import InstructionsPage from "./pages/instructions";

const AppRoutes: React.FC = () => (
  <>
    <NavbarComponent /> {/* Navbar is now inside Router */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/instructions" element={<InstructionsPage />} />
      <Route path="/new-record" element={<AddNewPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </>
);

export default AppRoutes;
