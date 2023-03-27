import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import * as Api from "../../services/api";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  Box,
  Card,
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
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateModal from "../../components/layouts/UpdateProduct";
import { toast } from "react-toastify";

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
  { id: "city", label: "City", alignRight: true },
  { id: "state", label: "State", alignRight: true },
  { id: "country", label: "Country", alignRight: true },
  { id: "lavel", label: "Lavel", alignRight: true },
  { id: "class", label: "Bank", alignRight: true },
  { id: "extra", label: "Type", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
  { id: "availabilitystatus", label: "Availability Status", alignRight: true }
];

const displayIcon = (type: any) => {
  if (type === "master")
    return <Icon icon="logos:mastercard" height={40} width={40} />;
  if (type === "visa") return <Icon icon="logos:visa" height={40} width={40} />;
  if (type === "discover")
    return <Icon icon="logos:discover" height={40} width={40} />;
};
const TotalCards = () => {
  const [sellerProducts, setSellerProducts] = useState<any>();
  const [singleProducts, setSingleProducts] = useState<any>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSellerProducts = async () => {
    const [err, res] = await Api.getSellerCards();
    if (err) {
      console.log(err);
    }
    if (res) {
      console.log(res,"Seller cards______");
      
      setSellerProducts(res?.data);
    }
  };

  const updateProduct = async (item: any) => {
    setSingleProducts(item);
    handleOpen();
  };

  const deleteProduct = async (item: any) => {
    const [error, response] = await Api.deleteCard(item._id);
    if (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (response) {
      getSellerProducts();
      toast.success("Deleted!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <Box>
      <Navbar />
      <Header title="Products" subtitle="Owl Store > Products" />
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Card sx={{ borderRadius: 5, p: 3 }}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_HEAD?.map((headCell: any) => (
                    <TableCell key={headCell.id}>
                      <TableSortLabel hideSortIcon>
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sellerProducts?.map((card: any) => (
                  <>
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
                        <img
                          crossOrigin="anonymous"
                          loading="lazy"
                          width="50"
                          height="25"
                          src={`https://countryflagsapi.com/png/${card?.address?.country?.toLowerCase()}`}
                          alt=""
                        />
                        {/* <Typography variant="subtitle2" noWrap>
                          {card?.address?.country}
                        </Typography> */}
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
                      <TableCell sx={{}}>
                            <Typography variant="subtitle2" noWrap>
                              {card?.avaibility}
                            </Typography>
                          </TableCell>
                      {/* <TableCell sx={{ cursor: "pointer" }}>
                        <ColorButton
                          variant="contained"
                          onClick={() => updateProduct(card)}
                        >
                          <EditIcon />
                        </ColorButton>
                      </TableCell> */}
                      <TableCell sx={{ cursor: "pointer" }}>
                        <ColorButton
                          variant="contained"
                          onClick={() => deleteProduct(card)}
                        >
                          <DeleteIcon />
                        </ColorButton>
                      </TableCell>

                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
      <UpdateModal
        open={open}
        handleClose={handleClose}
        item={singleProducts}
      />
      <Footer />
    </Box>
  );
};

export default TotalCards;
