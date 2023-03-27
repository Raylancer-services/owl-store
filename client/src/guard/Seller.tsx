import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Seller = () => {
  const auth = localStorage.getItem("authToken");
  const userRole: any = localStorage.getItem("userRole");
  const approvedByAdmin :any = localStorage.getItem("approvedByAdmin")
  return auth && userRole === "ROLE_SELLER" && approvedByAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/register-seller" />
  );
};

export default Seller;
