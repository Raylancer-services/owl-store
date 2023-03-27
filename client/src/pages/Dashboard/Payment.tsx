import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Link,
  Button,
  Divider,
  Typography,
  Stack,
  DialogProps,
} from "@mui/material";
import { Icon } from "@iconify/react";

interface CustomState {
  url: string;
}
const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const state = location.state as CustomState;

  // useEffect(() => {
  //   window.location.replace(state?.url);
  // }, []);
  return (
    <>
      <Box sx={{ p: 4, maxWidth: 480, margin: "auto" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" paragraph>
            Thank you for your purchase!
          </Typography>

          <Typography align="left" paragraph>
            Thanks for placing order &nbsp;
            <Link href="#">01dc1370-3df6-11eb-b378-0242ac130002</Link>
          </Typography>

          <Typography align="left" sx={{ color: "text.secondary" }}>
            {/* Please complete payment to proceed. */}
            <br /> <br /> If you have any question or queries then fell to get
            in contact us. <br /> <br /> All the best,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            startIcon={<Icon icon={"eva:arrow-ios-back-fill"} />}
          >
            Continue Shopping
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Payment;
