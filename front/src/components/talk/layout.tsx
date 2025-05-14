import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Box } from "@mui/material";

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
