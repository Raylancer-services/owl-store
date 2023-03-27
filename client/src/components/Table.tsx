import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  TableSortLabel,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import moment from "moment";
import * as Api from "../services/api";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const TableComp = (props: any) => {
  const TABLE_HEAD = [
    { id: "bin", label: "Bin", alignRight: false },
    { id: "base", label: "Base", alignRight: false },
    { id: "zip", label: "Zip", alignRight: false },
    { id: "city", label: "City", alignRight: true },
    { id: "state", label: "State", alignRight: true },
    { id: "country", label: "Country", alignRight: true },
    { id: "lavel", label: "Lavel", alignRight: true },
    { id: "class", label: "Class", alignRight: true },
    // { id: "extra", label: "Extra", alignRight: true },
    { id: "price", label: "Price", alignRight: true },
    { id: "cart", label: "", alignRight: true },
  ];
  const [cartItems, setCartItems] = useState<any>();

  const [disabled, setDisabled] = useState(false);

  

  //Check item is present or not in the cart.
  function checkItem(arr: any, item_id: string) {
    const found = arr.some((el: any) => el.itemId._id === item_id);
    if (found) return true;
  }

  const addToCart = async (item_id: string) => {
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
        toast.success("Item successfully added to cart.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    const getCart = async () => {
      const [getUserCartErr, getUserCartRes] = await Api.getCartItems();
      if (getUserCartErr) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setCartItems(getUserCartRes?.data?.cart);
    };
    getCart();
  }, []);

  const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa")
      return <Icon icon="logos:visa" height={40} width={40} />;
    if (type === "discover")
      return <Icon icon="logos:discover" height={40} width={40} />;
  };

  return (
    <>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox />
              </TableCell> */}
              {TABLE_HEAD?.map((headCell) => (
                <TableCell key={headCell.id}>
                  <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.cardList?.map((card: any) => (
              <>
                <TableRow key={card?._id}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell> */}
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
                      src={`https://countryflagsapi.com/png/${card?.address?.country?.toLowerCase()}`}
                      alt="country Img"
                    /> */}
                     <Typography variant="subtitle2" noWrap>
                      {card?.address?.country}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {card?.class}
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
                    >
                      <AddShoppingCartIcon />
                    </ColorButton>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComp;
