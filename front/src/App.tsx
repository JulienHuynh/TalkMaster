import "./style/global.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Homepage from "./pages/Homepage.tsx";
import Login from "./components/auth/Login.tsx";
import { defaultTalk } from "./constante/talk.ts";
import { CreateTalk } from "./pages/create-or-edit-talk.tsx";
import { Talk } from "./pages/talk-home.tsx";
import { TalkList } from "./pages/talk-list.tsx";
import Management from "./components/organizer/Management.tsx";
import Overview from "./components/organizer/Overview.tsx";
import Planning from "./components/organizer/Planning.tsx";

const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/talk"
              element={
                <ProtectedRoute>
                  <Talk />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-talk"
              element={
                <ProtectedRoute>
                  <CreateTalk talk={defaultTalk} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/talk-list"
              element={
                <ProtectedRoute>
                  <TalkList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-talk/:id"
              element={
                <ProtectedRoute>
                  <CreateTalk talk={defaultTalk} />
                </ProtectedRoute>
              }
            />
            <Route path="/organizer/overview" element={<Overview />} />
            <Route path="/organizer/planning" element={<Planning />} />
            <Route path="/organizer/management" element={<Management />} />
          </Routes>
        </Router>
    </>
  );
};

export default App;
