import "./style/global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TalkManagement from "./components/organizer/talk_management/TalkManagement.tsx";

const App = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<TalkManagement />} />
            </Routes>
        </Router>
    </>
  );
};

export default App;
