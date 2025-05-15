import "./style/global.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Homepage from "./components/auth/Homepage.tsx";
import Login from "./components/auth/Login.tsx";
import TalkManagement from "./components/organizer/talk_management/TalkManagement.tsx";
import { CreateTalk } from "./pages/create-or-edit-talk.tsx";
import { Talk } from "./pages/talk-home.tsx";
import { TalkList } from "./pages/talk-list.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Profile } from "./pages/profile.tsx";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <div className="w-3/5 mx-auto">
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
                    <CreateTalk />
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
                    <CreateTalk />
                  </ProtectedRoute>
                }
              />
              <Route path="/talk-management" element={<TalkManagement />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
