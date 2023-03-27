import { Box, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
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
        borderRadius:'50%'
      }}
    >
      <Box sx={{mt:'78px'}}>
        <Typography variant="h3">Search Cards</Typography>
        <Typography variant="body2" sx={{textAlign:'center'}}>Owl Store {">"} Search cards</Typography>
        {/* <Typography variant="body2" sx={{textAlign:'center'}}>
          Update! Added 3,222 fresh cards! 19 Oct 2022
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Banner;
