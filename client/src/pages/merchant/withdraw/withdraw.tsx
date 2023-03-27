import {
  Alert,
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../../components/layouts/Header";
import Navbar from "../../../components/Navbar";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Footer from "../../../components/Footer";
import * as Api from "../../../services/api";
import { toast } from "react-toastify";
import moment from "moment";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const Withdraw = () => {
  const [user, setUser] = useState<any>();
  const [amount, setAmount] = useState("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const [withdrawsList, setWithdrawsList] = useState<any>();

  const onChangePAymentAddress = (e: any) => {
    setPaymentAddress(e.target.value);
  };

  const getUser = async () => {
    const [user_err, user_res] = await Api.getUser();
    if (user_err) {
    }
    setUser(user_res?.data);
  };
  useEffect(() => {
    const init = async () => {
      getUser();
    };
    init();
  }, []);

  const handleOnSubmit = async () => {
    const [err, res] = await Api.createwithdrawalRequest(
      amount,
      paymentAddress
    );
    if (err) {
      toast.error(err?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (res) {
      toast.success("Withdrawal Request created!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //Get user withdrawal requests
  useEffect(() => {
    const getWithdrawals = async () => {
      const [err, res] = await Api.getWithdrawalRequest();
      if (res) {
        console.log({ res });
        setWithdrawsList(res?.data);
      }
    };
    getWithdrawals();
  }, []);

  return (
    <>
      <Box>
        <Navbar />
        <Header title="Withdraw" subtitle="Owl Store > Withdraw" />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ display: "", mt: 2 }}>
          <TextField
            fullWidth
            id="base"
            label="Creteria of withdraw - Minimum 50$"
            variant="outlined"
            disabled
            sx={{ borderLeft: "4px solid #EE2B70" }}
          />
        </Box>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
            <TextField
              required={true}
              fullWidth
              id="tipaymentle"
              label="Payment Address"
              variant="outlined"
              onChange={onChangePAymentAddress}
              // disabled
            />
            <TextField
              fullWidth
              id="base"
              label="Total Amount to withdraw"
              variant="outlined"
              onChange={(e: any) => setAmount(e.target.value)}
            />
          </Stack>
        </Stack>
        {amount > user?.walletBalance ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            Your wallet balance is {user?.walletBalance}
          </Alert>
        ) : (
          <></>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ColorButton
            variant="contained"
            startIcon={<CurrencyExchangeIcon />}
            sx={{ mt: 3 }}
            onClick={handleOnSubmit}
            // disabled={amount < '50' ||amount > user?.walletBalance}
          >
            Submit
          </ColorButton>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 4 }}>
          <Typography variant="h4" sx={{ color: "#EE2B70", fontWeight: 600 }}>
            Withdrawal History
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Withdraw Id</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Address</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawsList?.length > 0 &&
                withdrawsList.map((row: any) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>
                      {moment(row?.createdAt).format("DD-MM-YYYY,h:mm a")}
                    </TableCell>
                    <TableCell>{row?._id}</TableCell>
                    <TableCell>{row?.amount}</TableCell>
                    <TableCell>{row?.paymentAddress}</TableCell>
                    <TableCell>{row?.paymentStatus}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Withdraw;
