import { Box, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableSortLabel,
  Container,
} from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import * as Api from "../../services/api";
import moment from "moment";
import { Icon } from "@iconify/react";
import EmptyContent from "../../components/EmptyContent";
import EmtyTxImg from "../../images/tximg.png";
import LinkIcon from "@mui/icons-material/Link";
import DepositMoney from "./DepositMoney";
import RefreshIcon from "@mui/icons-material/Refresh";
import DisplayBillingStatus from "../DisplayBillingStatus";
import DisplayBillingExpiryTime from "../DisplayBillingExpiryTime";
import DisplayDepositUrl from "../DisplayDeposit/DisplayDepositUrl";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const TABLE_HEAD = [
  // { id: "id", label: "Billing Id", alignRight: false },
  { id: "txid", label: "Transaction Id", alignRight: false },
  { id: "createdAt", label: "Deposit Date", alignRight: false },
  { id: "paymentApproved", label: "Payment Approved", alignRight: false },
  { id: "amount", label: "Amount to pay", alignRight: true },
  { id: "recipientAddress", label: "Recipient Address", alignRight: true },
  { id: "checkoutUrl", label: "Deposit", alignRight: false },
  { id: "statusUrl", label: "Payment Status", alignRight: true },
  { id: "payWith", label: "Pay With", alignRight: true },
  // { id: "expiry", label: "Expire time", alignRight: true },
  // { id: "status", label: "Payment status", alignRight: true },
];

const BillingList = () => {
  const [billings, setBillings] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUserBillings = async () => {
    const [err, res] = await Api.getBillingsUsers();
    if (res) {
      setBillings(res?.data);
      // let sortedList = res?.data?.sort((a: any, b: any) => {
      //   moment(a?.createdAt)
      //     .format("'MM/DD/YYYY'")
      //     .split("/")
      //     .reverse()
      //     .join()
      //     .localeCompare(
      //       moment(b?.createdAt)
      //         .format("'MM/DD/YYYY'")
      //         .split("/")
      //         .reverse()
      //         .join()
      //     );
      // });
      // setBillings(sortedList)
      // console.log({sortedList});
    }
  };

  const displayIcon = (type: any) => {
    if (type === "BTC")
      return <Icon icon="cryptocurrency-color:btc" height={40} width={40} />;
    if (type === "LTC")
      return <Icon icon="cryptocurrency:ltc" height={40} width={40} />;
    if (type === "USDT")
      return <Icon icon="cryptocurrency-color:usdt" height={40} width={40} />;
  };
  const displayStatusIcon = (status: any) => {
    if (status === "pending")
      return (
        <Icon
        icon="material-symbols:pending-actions"
        height={30}
        width={30}
        color="lightblue"
      />
      );
    if (status === "approved")
      return (
        <Icon
          icon="fluent-mdl2:completed-solid"
          height={30}
          width={30}
          color="green"
        />
      );
    if (status === "decline")
      return (
        <Icon
          icon="material-symbols:cancel-rounded"
          height={30}
          width={30}
          color="red"
        />
      );
  };
  useEffect(() => {
    const init = async () => {
      getUserBillings();
      // fetchTxInfo()
    };
    init();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          mt: 4,
        }}
      >
        <Box>
          <ColorButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            {" "}
            Add Money
          </ColorButton>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ColorButton
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={getUserBillings}
          >
            Refresh
          </ColorButton>
        </Box>
        <Card sx={{ borderRadius: 5, p: 3 }}>
          {billings?.length === 0 || billings === undefined ? (
            <EmptyContent
              title="You haven't deposit any amount yet!"
              description="Billing section is empty. After deposit, You can see your transaction list here!"
              img={EmtyTxImg}
            />
          ) : (
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD?.map((headCell) => (
                      <TableCell key={headCell.id}>
                        <TableSortLabel hideSortIcon>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {headCell.label}
                          </Typography>
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billings?.map((billing: any) => (
                    <>
                      <TableRow key={billing._id}>
                        <TableCell sx={{}}>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ fontSize: "medium" }}
                          >
                            {billing?.txId?.slice(0, 8)} ...
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: "#FDE7EF",
                              p: 1,
                              textAlign: "center",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              {moment(billing?.createdAt).format(
                                "DD-MM-YYYY,h:mm a"
                              )}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{}}>
                          {/* <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ fontSize: "medium" }}
                          >
                            {billing?.paymentApproved}
                          </Typography> */}

                          <Box sx={{display:'flex'}}>
                            {displayStatusIcon(billing?.paymentApproved)}
                            <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ fontSize: "medium" ,ml:1}}
                          >
                            {billing?.paymentApproved}
                          </Typography>
                          </Box>

                        </TableCell>
                        <TableCell sx={{}}>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ fontSize: "medium" }}
                          >
                            {billing?.payWith} {billing?.amount}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{}}>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ fontSize: "medium" }}
                          >
                            {billing?.recipientAddress}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {/* <a href={billing?.checkoutUrl}>
                            Go to this Link to complete your payment.
                          </a> */}
                          <DisplayDepositUrl url={billing?.checkoutUrl} />
                        </TableCell>
                        <TableCell sx={{}}>
                          {/* <a href={billing?.statusUrl}>
                            <LinkIcon />
                          </a> */}
                          <ColorButton
                            variant="contained"
                            onClick={() => window.open(billing?.statusUrl)}
                          >
                            Payment status
                          </ColorButton>
                        </TableCell>
                        <TableCell sx={{}}>
                          {displayIcon(billing?.payWith)}
                        </TableCell>
                        {/* <TableCell sx={{}}>
                        <DisplayBillingExpiryTime txID={billing?.txId} />
                        </TableCell> */}
                        {/* <TableCell sx={{}}>
                          <DisplayBillingStatus txID={billing?.txId} />
                        </TableCell> */}
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Container>
      <DepositMoney
        open={open}
        handleClose={handleClose}
        getUserBillings={getUserBillings}
      />
    </Box>
  );
};

export default BillingList;
