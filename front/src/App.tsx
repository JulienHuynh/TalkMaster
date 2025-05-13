import "./style/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/auth/Homepage.tsx";
import Login from "./components/auth/Login.tsx";
import CreateTalk from "./pages/CreateTalk.tsx";
import Talk from "./pages/Talk.tsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/talk" element={<Talk />} />
          <Route path="/create-talk" element={<CreateTalk />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
