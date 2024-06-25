import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import Navbar from "./components/navbar/NavBar";
import ConstructionMaterialsPage from "./pages/ConstructionMaterialsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/*" element={<PeoplePage />} />
        <Route path="/construction_materials/*" element={<ConstructionMaterialsPage />} />
      </Routes>
    </>
  );
}

export default App;
