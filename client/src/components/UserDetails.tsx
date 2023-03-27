import React, { useState, useEffect } from "react";
import * as Api from "../services/api";
import { Typography } from "@mui/material";

const UserDetails = (props: any) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getUserByID(props?.userID);
      if (error) {
        console.log(error);
      }
      setUser(response?.data);
    };
    init();
  }, []);

  return (
    <>
      <Typography variant="subtitle2" sx={{ fontSize: "medium" }}>
        {" "}
        By {user?.username}{" "}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontSize: "medium", color: "text.secondary" }}
      >
        {user?._id}{" "}
      </Typography>
    </>
  );
};

export default UserDetails;
