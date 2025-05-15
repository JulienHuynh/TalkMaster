import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { type ReactNode, useState } from "react";
import { FaCalendarAlt, FaMicrophoneAlt } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { LuCalendarClock } from "react-icons/lu";
import { RiErrorWarningFill } from "react-icons/ri";
// src/components/ProtectedRoute.jsx
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PublicFooter = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Planning");

  return (
    <BottomNavigation
      value={value}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#f8f9fa",
      }}
      onChange={(_, newValue) => {
        switch (newValue) {
          case "Planning":
            setValue("Planning");
            navigate("/talk-traking");
            break;
          default:
            break;
        }
      }}
    >
      <BottomNavigationAction value="Planning" icon={<FaCalendarAlt />} />
    </BottomNavigation>
  );
};

const SpeakerFooter = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Talk");
  return (
    <BottomNavigation
      value={value}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#f8f9fa",
      }}
      onChange={(_, newValue) => {
        switch (newValue) {
          case "Talk":
            setValue("Talk");
            navigate("/talk");
            break;
          case "Suivi":
            setValue("Suivi");
            navigate("/talk-traking");
            break;
          default:
            break;
        }
      }}
    >
      <BottomNavigationAction value="Talk" icon={<FaMicrophoneAlt />} />
      <BottomNavigationAction value="Suivi" icon={<RiErrorWarningFill />} />
    </BottomNavigation>
  );
};

const OrganizerFooter = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Demandes");
  return (
    <BottomNavigation
      value={value}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#f8f9fa",
      }}
      onChange={(_, newValue) => {
        switch (newValue) {
          case "Demandes":
            setValue("Demandes");
            navigate("/organizer/management");
            break;
          case "Créneaux":
            setValue("Créneaux");
            navigate("/organizer/overview");
            break;
          case "Planning":
            setValue("Planning");
            navigate("/organizer/planning");
            break;
          default:
            break;
        }
      }}
    >
      <BottomNavigationAction value="Demandes" icon={<GrValidate />} />
      <BottomNavigationAction value="Créneaux" icon={<LuCalendarClock />} />
      <BottomNavigationAction value="Planning" icon={<FaCalendarAlt />} />
    </BottomNavigation>
  );
};

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <p>Chargement en cours...</p>; // ou <Skeleton /> etc.
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (user?.role) {
    case "organizer":
      return (
        <>
          {children}
          <OrganizerFooter />
        </>
      );
    case "speaker":
      return (
        <>
          {children}
          <SpeakerFooter />
        </>
      );
    default:
      return (
        <>
          {children}
          <PublicFooter />
        </>
      );
  }
}
