import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  Box,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const PaymentConfirmation = (props: any) => {
  const navigate = useNavigate();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl

  return (
    <div>
      <Dialog
        open={props.open}
        // onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-title">
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ColorButton variant="contained" onClick={props?.handleClose}>
              <CloseIcon />
            </ColorButton>
          </Box> */}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 4, maxWidth: 480, margin: "auto" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" paragraph>
                Thank you for your purchase!
              </Typography>

              <Typography
                align="left"
                variant="h5"
                sx={{ color: "green" }}
              >
                Payment recieved : &nbsp; ฿{props?.totalPrice}
              </Typography>

              <Typography align="left" paragraph>
                Thanks for placing order &nbsp;
                <Link href="#">{props?.orderId}</Link>
              </Typography>

              <Typography align="left" sx={{ color: "text.secondary" }}>
                {/* Please complete payment to proceed. */}
                <br /> <br /> If you have any question or queries then fell to
                get in contact us. <br /> <br /> All the best,
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Button
                // color="#EE2B70"
                onClick={() => navigate("/")}
                startIcon={<Icon icon={"eva:arrow-ios-back-fill"} />}
                variant='contained'
              >
                Continue Shopping
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentConfirmation;
