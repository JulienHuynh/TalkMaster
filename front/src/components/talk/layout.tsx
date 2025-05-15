import { Box } from "@mui/material";
import type React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Box component="main" sx={{ py: 4, px: 4, pb: 12 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
