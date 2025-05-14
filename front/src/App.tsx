import "./style/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/auth/Homepage.tsx";
import Login from "./components/auth/Login.tsx";
import { defaultTalk } from "./constante/talk.ts";
import { CreateTalk } from "./pages/create-or-edit-talk.tsx";
import { Talk } from "./pages/talk-home.tsx";
import { TalkList } from "./pages/talk-list.tsx";
import TalkTraking from "./pages/talk-traking.tsx";

const App = () => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/talk" element={<Talk />} />
            <Route
              path="/create-talk"
              element={<CreateTalk talk={defaultTalk} />}
            />
            <Route path="/talk-list" element={<TalkList />} />
            <Route
              path="/edit-talk/:id"
              element={<CreateTalk talk={defaultTalk} />}
            />
            <Route path="/talk-traking" element={<TalkTraking />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
