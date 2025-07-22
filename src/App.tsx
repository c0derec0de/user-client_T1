import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user/create" element={<MainPage />} />
      <Route path="/login" element={<MainPage />} />
    </Routes>
  );
}

export default App;
