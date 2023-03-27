import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Box,
  Typography,
  Stack,
  TextField,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { Icon } from "@iconify/react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
import * as Api from "../../services/api";
import { useNavigate } from "react-router-dom";

const { getCode, getName } = require("country-list");
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const classOption = [
  {
    value: "credit",
    label: "Credit",
  },
  {
    value: "debit",
    label: "Debit",
  },
];

const levelOption = [
  {
    value: "classic",
    label: "Classic",
  },
  {
    value: "platinum",
    label: "Platinum",
  },
];
const TABLE_HEAD = [
  { id: "bin", label: "Bin", alignRight: false },
  { id: "base", label: "Base", alignRight: false },
  { id: "zip", label: "Zip", alignRight: false },
  { id: "city", label: "City", alignRight: true },
  { id: "state", label: "State", alignRight: true },
  { id: "country", label: "Country", alignRight: true },
  { id: "lavel", label: "Level", alignRight: true },
  { id: "class", label: "Bank", alignRight: true },
  { id: "extra", label: "Type", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
  { id: "cart", label: "", alignRight: true },
];
const SearchFilter = (props: any) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [lebel, setLebel] = useState("");
  const [class_option, setClassOption] = useState("");
  const [bank, setBank] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");

  console.log("country_____", country);

  const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa")
      return <Icon icon="logos:visa" height={40} width={40} />;
    if (type === "discover")
      return <Icon icon="logos:discover" height={40} width={40} />;
  };

  const [cartItems, setCartItems] = useState<any>();

  console.log(cartItems, "cartItems____________");

  const [disabled, setDisabled] = useState(false);

  //Check item is present or not in the cart.
  function checkItem(arr: any, item_id: string) {
    const found = arr?.some((el: any) => el?.itemId?._id === item_id);
    if (found) return true;
  }

  const addToCart = async (item_id: string) => {
    // if(cartItems.length > 0){
    //   toast.error("You have already a item in your cart.", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
    let itemIsPresentOrNot = checkItem(cartItems, item_id);
    if (itemIsPresentOrNot === true) {
      toast.info("This item already exist in your cart.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const [addToCartError, addToCartResponse] = await Api.addToCart(item_id);
      if (addToCartError) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (addToCartResponse) {
        setDisabled(true);
        navigate("/checkout");
        toast.success("Item successfully added to cart.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    const getCart = async () => {
      const [getUserCartErr, getUserCartRes] = await Api.getCartItems();
      if (getUserCartRes?.data?.cart.length > 0) {
        setDisabled(true);
      }
      if (getUserCartErr) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setCartItems(getUserCartRes?.data?.cart);
    };
    getCart();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 5, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: 500, fontSize: "42px" }}>
              Search
            </Typography>{" "}
            <Typography
              sx={{
                color: "#EE2B70",
                ml: 1,
                fontWeight: 500,
                fontSize: "42px",
                // fontFamily: "poppins",
              }}
            >
              Filters
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                fullWidth
                id="bins"
                label="Country"
                variant="outlined"
                onChange={(e: any) => setCountry(e.target.value)}
              />
              <TextField
                fullWidth
                id="bins"
                label="Level"
                variant="outlined"
                onChange={(e: any) => setLebel(e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                fullWidth
                id="type"
                label="Type"
                variant="outlined"
                onChange={(e: any) => setType(e.target.value)}
              />
              <TextField
                fullWidth
                id="city"
                label="City"
                variant="outlined"
                onChange={(e: any) => setCity(e.target.value)}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                fullWidth
                id="bins"
                label="Bank"
                variant="outlined"
                onChange={(e: any) => setBank(e.target.value)}
              />
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Card List */}

      <Card sx={{ borderRadius: 5, p: 3, mt: 4, mb: 4 }}>
        {props?.cardList?.length === 0 || props?.cardList === undefined ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#EE2B70", fontWeight: 600 }}
          >
            No Cards Found!
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ minWidth: 800 }}>
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
                  {/* 
                    .filter((val: any) => {
                      if (searchInput === '') {
                        return val;
                      } else if (
                        val?.company_name?.toLowerCase().includes(searchInput.toLowerCase()) ||
                        val?.first_name?.toLowerCase().includes(searchInput.toLowerCase())
                      ) {
                        return val;
                      }
                    }) */}
                  {props?.cardList
                    ?.filter((val: any) => {
                      if (
                        country === "" &&
                        lebel === "" &&
                        class_option === "" &&
                        bank === "" &&
                        type === "" &&
                        city === ""
                      ) {
                        return val;
                      } else if (
                        val?.address?.country?.toLowerCase() ===
                          country?.toLowerCase() ||
                        val?.level === lebel ||
                        val?.class === class_option ||
                        val?.bankName?.toLowerCase() === bank?.toLowerCase() ||
                        val?.type === type ||
                        val?.address?.city === city
                      ) {
                        return val;
                      }
                    })
                    .map((card: any) => (
                      <TableRow key={card?._id}>
                        <TableCell sx={{ display: "flex" }}>
                          {displayIcon(card.type)}
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ ml: 1, mt: 1 }}
                          >
                            {card?.cardNumber?.slice(0, 6)}
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
                              {moment(card?.base).format("MMMM YY")}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.address?.zip}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.address?.city}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.address?.state}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {/* <img
                            crossOrigin="anonymous"
                            loading="lazy"
                            width="50"
                            height="25"
                            // src={`https://countryflagsapi.com/png/${getCode(card?.address?.country?.toLowerCase())}`}
                            src={`https://flagcdn.com/w80/${getCode(card?.address?.country)}`}
                            alt={getCode(card?.address?.country?.toLowerCase())}
                          /> */}
                          {getCode(card?.address?.country?.toLowerCase())}
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.level}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.bankName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            $ {card?.price}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ cursor: "pointer" }}>
                          <ColorButton
                            variant="contained"
                            onClick={() => addToCart(card?._id)}
                            disabled={disabled}
                          >
                            <AddShoppingCartIcon />
                          </ColorButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Card>
    </Container>
  );
};

export default SearchFilter;
