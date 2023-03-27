import React from "react";
import { Box, Container, Stack, TextField } from "@mui/material";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TotalCards = () => {
  return (
    <>
      <Box>
        <Navbar />
        
        <Header title="Total Cards" subtitle="Owl Store > Total Cards" />
      </Box>
      <Footer />
    </>
  );
};

export default TotalCards;
