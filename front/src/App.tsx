import "./style/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TalkManagement from "./components/organizer/talk_management/TalkManagement.tsx";
import CreateTalk from "./pages/CreateTalk.tsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TalkManagement />} />
          <Route path="/create-talk" element={<CreateTalk />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
