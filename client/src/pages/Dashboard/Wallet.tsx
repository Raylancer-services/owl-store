import React from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Box,
  Container,
  Card,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import PerfectMoneyImg from "../../images/perfectmoney.png";
import Image from "../../components/Image";
const Wallet = () => {

  
  return (
    <Box>
      <Navbar />
      <Header title="Wallet" subtitle="Owl Store > Wallet" />
      <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
        <Box
          sx={{
            display: "grid",
            gap: 5,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Card
            sx={{
              mt: 2,
              p: 1,
              backgroundImage:
                "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Icon
                icon="cryptocurrency-color:btc"
                width="30"
                height="30"
              ></Icon>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Bitcoin
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Icon
                icon="cryptocurrency-color:btc"
                width="20"
                height="20"
              ></Icon>{" "}
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                Min is 20USD ~ 0.000059BTC
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Add Balance using bitcoin currency
            </Button>
          </Card>

          <Card
            sx={{
              mt: 2,
              p: 1,
              backgroundImage:
                "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Icon icon="cryptocurrency:usd" width="30" height="30"></Icon>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                USD Tron/TRC-20
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Icon icon="cryptocurrency:usd" width="20" height="20"></Icon>{" "}
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                Min is 20USD
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Add Balance using USDT-TRC20
            </Button>
          </Card>

          <Card
            sx={{
              mt: 2,
              p: 1,
              backgroundImage:
                "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Icon icon="ph:currency-eth" width="30" height="30"></Icon>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Ether
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Icon icon="ph:currency-eth" width="20" height="20"></Icon>{" "}
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                Min is 20USD ~ 0.00079ETH
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Add Balance using Ethereum currency
            </Button>
          </Card>

          <Card
            sx={{
              mt: 2,
              p: 1,
              backgroundImage:
                "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Image
                disabledEffect
                visibleByDefault
                alt="coin payment"
                src={PerfectMoneyImg}
                sx={{ height: 30 }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Perfect Money
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Image
                disabledEffect
                visibleByDefault
                alt="coin payment"
                src={PerfectMoneyImg}
                sx={{ height: 20 }}
              />{" "}
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                Min is 20USD
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Add Balance
            </Button>
          </Card>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Wallet;
