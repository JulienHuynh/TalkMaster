import "./style/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/auth/Homepage.tsx";
import Login from "./components/auth/Login.tsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
