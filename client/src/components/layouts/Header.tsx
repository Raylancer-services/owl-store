import { Box, Typography } from "@mui/material";
import React from "react";

const Header = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        backgroundColor: "#F8AAC6",
        mt: -10,
        p: 10,
        // borderBottomLeftRadius: "550px",
        // borderBottomRightRadius: "550px",
        borderRadius: "50%",
      }}
    >
      <Box sx={{ mt: "78px" }}>
        <Typography
          sx={{ typography: { sm: "h3", xs: "h5" }, fontWeight: "bold",textAlign: "center" }}
        >
          {props?.title}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {props?.subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
