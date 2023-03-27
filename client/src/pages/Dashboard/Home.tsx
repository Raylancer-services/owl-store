import React, { useState, useEffect } from "react";
import * as Api from "../../services/api";
import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";
import CardList from "../../components/layouts/CardList";
import SearchFilter from "../../components/layouts/SearchFilter";
import Footer from "../../components/Footer";
import Header from "../../components/layouts/Header";
import { ToastContainer } from "react-toastify";
import MerchantDashboard from "../merchant/Dashboard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const USER_ROLE = localStorage.getItem("userRole");
  const approvedByAdmin: any = localStorage.getItem("approvedByAdmin");

  const [cardList, setCardList] = useState<any>([]);

  console.log("cardList",cardList);
  
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getCards();
      if (res) {
        setCardList(res.data);
      }
    };
    init();
  }, []);

  const logoutHandler = () =>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("approvedByAdmin");
    navigate("/login");
  }
  return (
    <>
      {USER_ROLE === "ROLE_USER" ? (
        <>
          <Box>
            <Navbar />
            {/* <Banner /> */}
            <Header title="Search Cards" subtitle="Owl Store > Search Cards" />
            <SearchFilter cardList={cardList} />
            {/* <CardList cardList={cardList}/> */}
            <Footer />
          </Box>
          <ToastContainer />
        </>
      ) : (
        <></>
      )}

      {/* {USER_ROLE === "ROLE_SELLER" && approvedByAdmin?.toString() === "false" ? (
        <>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Waiting for approval by admin.After that you can access to the
              merchant dashboard.
            </Typography>
            <br />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button variant="contained" onClick={logoutHandler}>Logout</Button>
          </Box>
        </>
      ) : (
        <></>
      )} */}

      {approvedByAdmin.toString() === "true" ? (
        <>
          <MerchantDashboard />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
