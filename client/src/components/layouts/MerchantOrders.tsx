import React, { useState, useEffect } from "react";
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
  Card,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmptyContent from "../EmptyContent";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { Icon } from "@iconify/react";
import EmptyOrderImg from "../../images/orderimg.png";
import UserDetails from "../UserDetails";
import OrderDetails from "./OrderDetails";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import * as Api from "../../services/api";
import { toast } from "react-toastify";
import CreateWithdrawalReqModel from "./CreateWithdrawalReqModel";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const TABLE_HEAD = [
  { id: "id", label: "Order Id", alignRight: false },
  { id: "date", label: "Purchase Date", alignRight: false },
  { id: "items", label: "Total Items", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "amount", label: "Total Price", alignRight: true },
  { id: "orderby", label: "Order By", alignRight: true },
  // { id: "paystatus", label: "Payment Status", alignRight: true },
];

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const UserOrders = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl
  const displayIcon = (status: any) => {
    if (status === "Placed")
      return (
        <Icon
          icon="material-symbols:pending-actions"
          height={30}
          width={30}
          color="lightblue"
        />
      );
    if (status === "Cancelled")
      return (
        <Icon
          icon="material-symbols:cancel-rounded"
          height={30}
          width={30}
          color="red"
        />
      );
    if (status === "Completed")
      return (
        <Icon
          icon="fluent-mdl2:completed-solid"
          height={30}
          width={30}
          color="green"
        />
      );
  };

  const [orderDetail, setOrderDetail] = useState<any>();

  const [orderAmn, setOrderAmn] = useState("");
  const [orderID, setOrderID] = useState("");

  const [Loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openWithdrawalRequestModel, setOpenWithdrawalRequestModel] =
    useState(false);
  const handleOpenWithdrawalRequestModel = () =>
    setOpenWithdrawalRequestModel(true);
  const handleCloseWithdrawalRequestModel = () =>
    setOpenWithdrawalRequestModel(false);

  const orderDetails = (order: any) => {
    handleOpen();
    setOrderDetail(order);
  };

  const [paymentAddress, setPaymentAddress] = useState("");

  const onChangePAymentAddress = (e: any) => {
    setPaymentAddress(e.target.value);
  };

  const createWithdrawal = async (amn: string, orderID: string) => {
    console.log({ amn, orderID });

    setOrderAmn(amn);
    setOrderID(orderID);
    handleOpenWithdrawalRequestModel();
  };

  const handleOnSubmit = async () => {
    setLoading(true);
    const [err, res] = await Api.createwithdrawalRequest(
      orderAmn,
      orderID,
      // paymentAddress
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
      handleCloseWithdrawalRequestModel();
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Card sx={{ borderRadius: 5, p: 3 }}>
        {props?.userOrders?.length === 0 || props?.userOrders === undefined ? (
          <>
            <EmptyContent
              title="You haven't placed any order yet!"
              description="Order section is empty. After placing order, You can track them from here!"
              img={EmptyOrderImg}
            />
          </>
        ) : (
          <>
            {props?.loadingUserOrders ? (
              <Box sx={{ display: "grid", placeContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer sx={{ minWidth: 500 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD?.map((headCell) => (
                        <TableCell key={headCell.id}>
                          <TableSortLabel hideSortIcon>
                            <Typography
                              variant="h6"
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
                    {props?.userOrders.map((order: any) => (
                      <>
                        <TableRow key={order._id} onClick={() => orderDetails(order)} sx={{cursor:'pointer'}}>
                          <TableCell sx={{}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              {order?._id?.slice(0, 8)} ...
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
                                {moment(order?.createdAt).format(
                                  "DD-MM-YYYY,h:mm a"
                                )}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              {order?.items?.length}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{}}>
                            <Box sx={{ display: "flex" }}>
                              {displayIcon(order?.status)}
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{ ml: 1, mt: 0.5, fontSize: "medium" }}
                              >
                                {order?.status}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              $ {order?.totalPrice}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{}}>
                            <UserDetails userID={order?.user} />
                          </TableCell>
                          <TableCell sx={{}}>
                            {/* <Box sx={{ display: "flex" }}>
                              {order?.isPaid.toString() === "true" ? (
                                <>
                                  <Icon
                                    icon="fluent-mdl2:completed-solid"
                                    height={30}
                                    width={30}
                                    color="green"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ fontSize: "medium", ml: 1 }}
                                  >
                                    Paid
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Icon
                                    icon="material-symbols:pending-actions"
                                    height={30}
                                    width={30}
                                    color="lightblue"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ fontSize: "medium", ml: 1 }}
                                  >
                                    Payment pending
                                  </Typography>
                                </>
                              )}
                            </Box> */}
                          </TableCell>
                          {/* {order?.withdrawalRequestCreated.toString() ===
                          "true" ? (
                            <TableCell>
                              <ColorButton
                                sx={{ width: "200%" }}
                                variant="contained"
                                // onClick={() => deleteProduct(card)}
                                disabled
                              >
                                withdrawal Request Created
                              </ColorButton>
                            </TableCell>
                          ) : (
                            <TableCell>
                              <ColorButton
                                sx={{ width: "200%" }}
                                variant="contained"
                                onClick={() =>
                                  createWithdrawal(order?.totalPrice, order._id)
                                }
                              >
                                Create withdrawal Request
                              </ColorButton>
                            </TableCell>
                          )} */}
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Card>
      <OrderDetails
        open={open}
        handleClose={handleClose}
        orderDetail={orderDetail}
      />
      <div>
        <Dialog
          open={openWithdrawalRequestModel}
          onClose={handleCloseWithdrawalRequestModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle id="alert-dialog-title">
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ColorButton
                variant="contained"
                onClick={handleCloseWithdrawalRequestModel}
              >
                <CloseIcon />
                close
              </ColorButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
                <TextField
                  required={true}
                  fullWidth
                  id="amount"
                  label="Amount"
                  variant="outlined"
                  value={orderAmn}
                  disabled
                />
                <TextField
                  required={true}
                  fullWidth
                  id="order id"
                  label="Order Id"
                  variant="outlined"
                  value={orderID}
                  disabled
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "column" }} spacing={5}>
                <TextField
                  required={true}
                  fullWidth
                  id="tipaymentle"
                  label="Payment Address"
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
              {Loading ? (
                <ColorButton
                  variant="contained"
                  // onClick={handleOnSubmit}
                  // disabled={!amount}
                >
                  <CircularProgress />
                </ColorButton>
              ) : (
                <ColorButton
                  variant="contained"
                  onClick={handleOnSubmit}
                  // disabled={!amount}
                >
                  {" "}
                  Submit
                </ColorButton>
              )}
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default UserOrders;
