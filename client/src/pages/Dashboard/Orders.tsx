import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import * as Api from "../../services/api";
import UserOrders from "../../components/layouts/UserOrders";
import MerchantOrders from "../../components/layouts/MerchantOrders"

const Orders = () => {
  let user_role = localStorage.getItem("userRole");
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);
  const [userOrders, setUserOrders] = useState<any>();
  const [sellerOrders, setSellerOrders] = useState<any>();

  const getUserOrders = async () => {
    setLoadingUserOrders(true);
    const [user_order_err, user_order_res] = await Api.getOrdersUsers();
    if (user_order_err) {
      console.log(user_order_err);
    }
    setUserOrders(user_order_res?.data);
    setLoadingUserOrders(false);
  };

  const getSellerOrders = async () => {
    setLoadingUserOrders(true);
    const [loggedInUserErr, loggedInUserRes] = await Api.getUser();
    if (loggedInUserRes) {
      const [seller_order_err, seller_order_res] = await Api.getOrdersSellers(
        loggedInUserRes?.data?._id
      );
      if (seller_order_err) {
        console.log(seller_order_err);
      }
      setSellerOrders(seller_order_res?.data);
      setLoadingUserOrders(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getUserOrders();
      await getSellerOrders()
    };
    init();
  }, []);

  return (
    <Box>
      <Navbar />
      <Header title="Your Orders" subtitle="Owl Store > Orders" />
      {user_role === "ROLE_USER" ? (
        <>
          <UserOrders
            userOrders={userOrders}
            loadingUserOrders={loadingUserOrders}
          />
        </>
      ) : (
        <></>
      )}
      {user_role === "ROLE_SELLER" ? (
        <>
          <MerchantOrders
            userOrders={sellerOrders}
            loadingUserOrders={loadingUserOrders}
          />
        </>
      ) : (
        <></>
      )}
      <Footer />
    </Box>
  );
};

export default Orders;
