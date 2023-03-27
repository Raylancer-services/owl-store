import { Box, Typography, Link } from "@mui/material";
import React from "react";
import Image from "./Image";
import logoImg from "../images/logo.png";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const Footer = () => {
  const navigate = useNavigate();
  const approvedByAdmin: any = localStorage.getItem("approvedByAdmin");
  return (
    <Box
      sx={{
        backgroundColor: "#FDE7EF",
        p: { xs: "8px 10px 8px 10px", sm: "10px 40px 10px 40px" },
      }}
    >
      <Box>
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: { sm: "space-between" },
            p: { xs: "5px 10px 5px 10px", sm: "10px 50px 10px 50px" },
          }}
        >
          <Box>
            <Image
              disabledEffect
              src={logoImg}
              sx={{
                width: "fix-layout",
                height: { xs: "fix-layout", sm: "46px" },
                // height:'46px'
              }}
            />
          </Box>

          {/* <Box sx={{ display: "flex", mt: "12px" }}>
            <Link variant="h6" color="inherit" underline="none">
              Cards
            </Link>
            <Link variant="h6" color="inherit" underline="none" sx={{ ml: 2 }}>
              Orders
            </Link>
            <Link variant="h6" color="inherit" underline="none" sx={{ ml: 2 }}>
              Billings
            </Link>
            <Link variant="h6" color="inherit" underline="none" sx={{ ml: 2 }}>
              Tickets
            </Link>
            <Link variant="h6" color="inherit" underline="none" sx={{ ml: 2 }}>
              Rules
            </Link>
          </Box> */}
        </Box>
        <hr style={{ color: "#000000", border: "1px solid #000000" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: { xs: "5px 10px 5px 10px", sm: "10px 50px 10px 50px" },
          }}
        >
          <Box>
            <Typography variant="subtitle2">2022 © Owl Store</Typography>
          </Box>
          {/* {approvedByAdmin.toString() === "true" ? (
              <></>
            ) : (
              <Box sx={{ mt: "12px" }}>
                <ColorButton
                  onClick={() => navigate("/tickets")}
                  variant="contained"
                >
                  Become a seller on OwlStore
                </ColorButton>
              </Box>
            )} */}
          <Box sx={{ display: "flex" }}>
            <Typography variant="subtitle2">OwlStore.at</Typography>
            <Typography variant="subtitle2" sx={{ ml: 2 }}>
              Owl Store.net
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
