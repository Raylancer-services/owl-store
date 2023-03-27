import { Box } from '@mui/material'
import React from 'react'
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BillingList from '../../components/layouts/BillingList';
const Billings = () => {
  return (
    <Box>
      <Navbar />
      <Header title="Your Billings" subtitle="Owl Store > Billings" />
      <BillingList />
      <Footer />
    </Box>
  )
}

export default Billings