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
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const Assets = [
  {
    label: "Bitcoin(BTC)",
    value: "BTC",
    icon: "cryptocurrency-color:btc",
  },
  {
    label: "Litecoin(LTC)",
    value: "LTC",
    icon: "cryptocurrency:ltc",
  },
  {
    label: "USDT(TRC20)",
    value: "USDT",
    icon: "cryptocurrency-color:usdt",
  },
];

const DepositMoney = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [loading, set_loading] = useState(false);
  const [user, setUser] = useState<any>();

  const [deposit_url, set_deposit_url] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCoin((event.target as HTMLInputElement).value);
  };
  const controlProps = (item: string) => ({
    checked: selectedCoin === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const getUser = async () => {
    const [user_err, user_res] = await Api.getUser();
    if (user_err) {
      console.log(user_err);
    }
    setUser(user_res?.data);
  };
  useEffect(() => {
    const init = async () => {
      getUser();
    };
    init();
  }, []);

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const handleOnSubmit = async () => {
    set_loading(true);
    const [create_deposit_err, create_deposit_res] = await Api.createDeposit(
      amount,
      selectedCoin,
      user?.email_id,
      user?.username
    );
    if (create_deposit_err) {
      toast.error(create_deposit_err?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(create_deposit_err);
    }
    if (create_deposit_res) {
      set_deposit_url(create_deposit_res?.data?.result?.checkoutUrl);
      console.log(create_deposit_res);
      // props?.handleClose();
      props?.getUserBillings();
    }
    set_loading(false);
  };

  const depositLink = () => {
    window.open(deposit_url);
    props?.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ColorButton variant="contained" onClick={props?.handleClose}>
              <CloseIcon />
            </ColorButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                required={true}
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                value={user?.username}
                disabled
              />
              <TextField
                required={true}
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={user?.email_id}
                disabled
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                required={true}
                fullWidth
                id="amount"
                label="Amount"
                variant="outlined"
                onChange={onChangeAmount}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon
                        icon="el:usd"
                        color="#EE2B70"
                        width={30}
                        height={30}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
          <Box sx={{ display: "flex", mt: 1 }}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                <Typography variant="h6" sx={{ mt: 2, color: "#EE2B70" }}>
                  Select coin to pay for deposit.
                </Typography>
              </FormLabel>
              <RadioGroup
                {...controlProps("e")}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedCoin}
                onChange={handleChange}
              >
                {Assets.map((asset) => (
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <FormControlLabel
                      value={asset?.value}
                      control={<Radio />}
                      label={asset?.label}
                    />
                    <Box sx={{ mt: 1 }}>
                      <Icon icon={asset?.icon} width={30} height={30} />
                    </Box>
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          {deposit_url ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <a href={deposit_url}>
                  <Typography variant="h6" sx={{fontWeight:'bold'}}>
                    Please go to this link to complete your payment.
                  </Typography>
                </a> */}
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={depositLink}
                >
                  Please go to this link to complete your payment.
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
          >
            {loading ? (
              <ColorButton variant="contained">
                {" "}
                <CircularProgress />
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                onClick={handleOnSubmit}
                disabled={!amount}
              >
                {" "}
                Submit
              </ColorButton>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepositMoney;
