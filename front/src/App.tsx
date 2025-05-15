import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./style/global.css";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./components/auth/Login.tsx";
import Management from "./components/organizer/Management.tsx";
import Overview from "./components/organizer/Overview.tsx";
import Planning from "./components/organizer/Planning.tsx";
import { defaultTalk } from "./constante/talk.ts";
import Homepage from "./pages/Homepage.tsx";
import { CreateTalk } from "./pages/create-or-edit-talk.tsx";
import { Talk } from "./pages/talk-home.tsx";
import { TalkList } from "./pages/talk-list.tsx";
import TalkTraking from "./pages/talk-traking.tsx";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
            <Route path="/talk-traking" element={<TalkTraking />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
