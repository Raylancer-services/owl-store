import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Icon } from "@iconify/react";
import { pink } from "@mui/material/colors";
import * as Api from "../../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));
const CreateWithdrawalReqModel = (props:any) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl

    const [paymentAddress, setPaymentAddress] = useState("");

    const [Loading, setLoading] = useState(false);


  const onChangePAymentAddress = (e: any) => {
    setPaymentAddress(e.target.value);
  };

  const handleOnSubmit = async () => {

  }
  return (
    <div>
        <Dialog
          open={props?.openWithdrawalRequestModel}
          onClose={props?.handleCloseWithdrawalRequestModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle id="alert-dialog-title">
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ColorButton
                variant="contained"
                onClick={props?.handleCloseWithdrawalRequestModel}
              >
                <CloseIcon />
              </ColorButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction={{ xs: "column", sm: "column" }} spacing={5}>
                <TextField
                  required={true}
                  fullWidth
                  id="amount"
                  label="Amount"
                  variant="outlined"
                  value={props?.orderAmn}
                  disabled
                />
                <TextField
                  required={true}
                  fullWidth
                  id="order id"
                  label="Order Id"
                  variant="outlined"
                  value={props?.orderID}
                  disabled
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "column" }} spacing={5}>
                <TextField
                  required={true}
                  fullWidth
                  id="tipaymentle"
                  label="PAyment Address"
                  variant="outlined"
                  onChange={onChangePAymentAddress}
                  // disabled
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
            >
              <ColorButton
                variant="contained"
                onClick={handleOnSubmit}
                // disabled={!amount}
              >
                {" "}
                Submit
              </ColorButton>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
  )
}

export default CreateWithdrawalReqModel