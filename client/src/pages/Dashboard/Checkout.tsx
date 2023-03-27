import {
  Box,
  Card,
  Container,
  Grid,
  CardHeader,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  CardContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OrderSummary from "./OrderSummary";
import EmptyContent from "../../components/EmptyContent";
import EmtyCartImg from "../../images/empty-cart.png";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import * as Api from "../../services/api";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import PaymentConfirmation from "../../components/layouts/PaymentConfirmation";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const TABLE_HEAD = [
  { id: "bin", label: "Bin", alignRight: false },
  { id: "base", label: "Base", alignRight: false },
  { id: "zip", label: "Zip", alignRight: false },
  { id: "country", label: "Country", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
  // { id: "status", label: "Card Status", alignRight: true },
];

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

const Checkout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any>();
  const [totalPrice, setTotalPrice] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [checkout_loading, set_checkout_loading] = useState(false);
  const [orderId, setOrderId] = useState("");

  console.log(user, "User______________");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const getUserCart = async () => {
    const [err, res] = await Api.getCartItems();
    if (err) {
      toast.error(err?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (res) {
      setTotalPrice(res?.data?.totalPrice);
      setCartItems(res?.data?.cart);
    }
  };

  const getUser = async () => {
    const [user_err, user_res] = await Api.getUser();
    if (user_err) {
    }
    setUser(user_res?.data);
  };
  useEffect(() => {
    const init = async () => {
      getUserCart();
      getUser();
    };
    init();
  }, []);

  const handleCheckout = async () => {
    if (user?.walletBalance < totalPrice) {
      toast.error("You dont have enough balance.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      //Create user order
      set_checkout_loading(true);
      const [create_order_err, create_order_res] = await Api.createOrder(
        cartItems,
        selectedCoin,
        totalPrice
      );
      if (create_order_err) {
        toast.error(create_order_err?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setOrderId(create_order_res?.data?.order?._id);
      //Deduct money after order from user wallet
      if (
        create_order_res?.status === 201 &&
        create_order_res?.data?.order?._id
      ) {
        const [deduct_amn_err, deduct_amn_res] = await Api.deductAmount(
          user._id,
          totalPrice,
          create_order_res?.data?.order?._id
        );
        if (deduct_amn_err) {
          toast.error(deduct_amn_err?.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (deduct_amn_res) {
          toast.success("Order placed!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          //Check card validation
          // for (const item of create_order_res?.data?.order?.items) {
          //   // console.log(item, "item______________");
          //   let expiry_date = moment(item?.item?.expiryDate).format("DD/YY");

          //   const [err, res] = await Api.checkCard(
          //     item?.item?.cardNumber,
          //     expiry_date,
          //     item?.item?.cvv
          //   );
          //   if (err) {
          //     // console.log(err, "card validation error");
          //   }
          //   if (res) {
          //     // console.log("card validation response", res);
          //     if (
          //       res?.data === `'str' object has no attribute 'decode'` ||
          //       res?.data === `INVALID RESPONSE❌ Please try again!`
          //     ) {
          //       const [err, res] = await Api.checkCard(
          //         item?.item?.cardNumber,
          //         expiry_date,
          //         item?.item?.cvv
          //       );
          //     } else {
          //       let resStr = res?.data?.split(" ");
          //       // Refund if card is not valid
          //       if (resStr[0] === "DECLINED") {
          //         // console.log("refund initiate__________");
          //         const [err, res] = await Api.refundUser(
          //           create_order_res?.data?.order?._id,
          //           item?.item?.price
          //         );
          //         if (err) {
          //           // console.log("refund errr", err);
          //         }
          //         if (res) {
          //           // console.log("refund response____________", res);
          //         }
          //       }
          //     }
          //   }
          // }
          navigate("/orders");
        }
      }
      set_checkout_loading(false);
    }
  };

  const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa")
      return <Icon icon="logos:visa" height={40} width={40} />;
    if (type === "discover")
      return <Icon icon="logos:discover" height={40} width={40} />;
  };
  const removeFromCart = async (itemID: any) => {
    setLoading(true);
    const [error, response] = await Api.removeItem(itemID);
    if (error) {
      toast.error("Something went wrong.Plz try after sometime.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (response?.status === 200) {
      getUserCart();
      toast.info(response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar totalPrice={totalPrice} />
      <Header title="Checkouts" subtitle="Owl Store > Checkouts" />
      <Container maxWidth="lg"  sx={{ mt: 5,minHeight:'60vh' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Card sx={{ mb: 3, boxShadow: 5, borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ color: "#EE2B70" }}>
                    Cart
                    <Typography component="span" sx={{ color: "#EE2B70" }}>
                      &nbsp;({cartItems?.length} item)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 1 }}
              />

              <CardContent>
                {cartItems?.length === 0 || cartItems === undefined ? (
                  <EmptyContent
                    title="Cart is empty"
                    description="Look like you have no items in your shopping cart."
                    img={EmtyCartImg}
                  />
                ) : (
                  <>
                    <TableContainer sx={{ minWidth: 500 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {TABLE_HEAD?.map((headCell) => (
                              <TableCell key={headCell.id}>
                                <TableSortLabel hideSortIcon>
                                  {headCell.label}
                                </TableSortLabel>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartItems?.map((card: any) => (
                            <>
                              <TableRow key={card?.itemId?._id}>
                                <TableCell sx={{ display: "flex" }}>
                                  {displayIcon(card?.itemId?.type)}
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ ml: 1, mt: 1 }}
                                  >
                                    {card?.itemId?.cardNumber?.slice(0, 6)}
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
                                    <Typography variant="subtitle2" noWrap>
                                      {moment(card?.itemId?.base).format(
                                        "MMMM YY"
                                      )}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle2" noWrap>
                                    {card?.itemId?.address?.zip}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <img
                                    crossOrigin="anonymous"
                                    loading="lazy"
                                    width="50"
                                    height="25"
                                    src={`https://countryflagsapi.com/png/${card?.itemId?.address?.country?.toLowerCase()}`}
                                    alt=""
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle2" noWrap>
                                    $ {card?.itemId?.price}
                                  </Typography>
                                </TableCell>

                                <TableCell>
                                  {/* <CheckCard
                                    cardNumber={card?.itemId?.cardNumber}
                                    expiryDate={card?.itemId?.expiryDate}
                                    cvv={card?.itemId?.cvv}
                                  /> */}
                                </TableCell>

                                {/* <TableCell>
                                  <ColorButton
                                    variant="contained"
                                    startIcon={<CachedIcon />}
                                  >
                                    Recheck
                                  </ColorButton>
                                </TableCell> */}

                                <TableCell sx={{ cursor: "pointer" }}>
                                  <ColorButton
                                    variant="contained"
                                    onClick={() =>
                                      removeFromCart(card?.itemId?._id)
                                    }
                                  >
                                    {loading ? (
                                      <CircularProgress />
                                    ) : (
                                      <DeleteOutlineIcon />
                                    )}
                                  </ColorButton>
                                </TableCell>
                              </TableRow>
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment OPtions */}

            {/* <Card sx={{ mb: 2, boxShadow: 5, borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    sx={{ color: "#EE2B70", fontWeight: "bold" }}
                  >
                    Payment
                  </Typography>
                }
              />
              <CardContent>
                <Box
                  sx={{
                    border: "1px solid gray",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="subtitle2">
                        Pay with Coin Payment
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        You will be redirected to CoinPayment website to
                        complete your purchase securely
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Image
                      disabledEffect
                      visibleByDefault
                      alt="coin payment"
                      src={CoinPaymentImg}
                      sx={{ height: 40 }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 1 }}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      <Typography variant="h6" sx={{ mt: 2, color: "#EE2B70" }}>
                        Select coin to pay
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
              </CardContent>
            </Card> */}

            <ColorButton
              startIcon={<Icon icon={"eva:arrow-ios-back-fill"} />}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </ColorButton>
          </Grid>

          <Grid item xs={12} md={4} sx={{ mb: 5 }}>
            {/* Order Summary */}
            <OrderSummary
              totalItems={cartItems?.length}
              totalPrice={totalPrice}
            />
            {checkout_loading ? (
              <ColorButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={cartItems?.length === 0 || cartItems === undefined}
              >
                <CircularProgress />
              </ColorButton>
            ) : (
              <ColorButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={cartItems?.length === 0 || cartItems === undefined}
                onClick={handleCheckout}
              >
                Check Out
              </ColorButton>
            )}

            {/* <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", mt: 1, color: "#EE2B70" }}
            >
              * Please check card status i.e LIVE or DECLINED before proceed.
            </Typography> */}
          </Grid>
        </Grid>
        <PaymentConfirmation
          open={open}
          handleClose={handleClose}
          orderId={orderId}
          getUser={getUser}
          totalPrice={totalPrice}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
