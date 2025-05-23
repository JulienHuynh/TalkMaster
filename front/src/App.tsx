import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./style/global.css";
import { SnackbarProvider } from "notistack";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import Management from "./components/organizer/Management.tsx";
import Overview from "./components/organizer/Overview.tsx";
import Planning from "./components/organizer/Planning.tsx";
import Homepage from "./pages/Homepage.tsx";
import { CreateTalk } from "./pages/create-or-edit-talk.tsx";
import { Talk } from "./pages/talk-home.tsx";
import { TalkList } from "./pages/talk-list.tsx";
import TalkTraking from "./pages/talk-traking.tsx";

const queryClient = new QueryClient();

const App = () => {
  // const { user } = useAuth();
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
            {/* {user?.role === 'organizer' && ( */}
            {/* <> */}
            <Route
              path="/organizer/overview"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/planning"
              element={
                <ProtectedRoute>
                  <Planning />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/management"
              element={
                <ProtectedRoute>
                  <Management />
                </ProtectedRoute>
              }
            />
            {/* </> */}
            {/* )} */}
            <Route
              path="/talk-traking"
              element={
                <ProtectedRoute>
                  <TalkTraking />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;
