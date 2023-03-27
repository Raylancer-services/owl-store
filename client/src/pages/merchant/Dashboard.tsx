import { Box, TableContainer,Container } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/layouts/Header";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import HomePage from "./HomePage";
import AddCard from "./AddCard";
import BulkAddCards from "./BulkAddCards";
import Settings from "./Settings";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../components/Footer";

const NotActiveTabBtn = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#000000",
  backgroundColor: "#F4F4F4",
  "&:hover": {
    backgroundColor: "#F4F4F4",
  },
}));

const ActiveTabBtn = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const Dashboard = () => {
  const [home, setHome] = useState<boolean>(true);
  const [addCard, setAddCard] = useState<boolean>(false);
  const [addBulkCard, setAddBulkCard] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);

  const [homeTab, setHomeTab] = useState<boolean>(true);
  const [addCardTab, setAddCardTab] = useState<boolean>(false);
  const [addBulkCardTab, setAddBulkCardTab] = useState<boolean>(false);
  const [settingsTab, setSettingsTab] = useState<boolean>(false);

  const onClickHomeTab = () => {
    setHome(true);
    setHomeTab(true);
    setAddCard(false);
    setAddCardTab(false);
    setAddBulkCard(false);
    setAddBulkCardTab(false);
    setSettings(false);
    setSettingsTab(false);
  };
  const onClickAddCardTab = () => {
    setHome(false);
    setHomeTab(false);
    setAddCard(true);
    setAddCardTab(true);
    setAddBulkCard(false);
    setAddBulkCardTab(false);
    setSettings(false);
    setSettingsTab(false);
  };
  const onClickAddBulkCardTab = () => {
    setHome(false);
    setHomeTab(false);
    setAddCard(false);
    setAddCardTab(false);
    setAddBulkCard(true);
    setAddBulkCardTab(true);
    setSettings(false);
    setSettingsTab(false);
  };
  const onClickSettingsTab = () => {
    setHome(false);
    setHomeTab(false);
    setAddCard(false);
    setAddCardTab(false);
    setAddBulkCard(false);
    setAddBulkCardTab(false);
    setSettings(true);
    setSettingsTab(true);
  };
  return (
    <>
      <Box>
        <Navbar />
        {home ? <Header title="Dashboard" subtitle="Owl Store > Seller Dashboard" /> : <></>}
        {addCard ? (
          <Header title="Add Cards" subtitle="Owl Store > Add Cards" />
        ) : (
          <></>
        )}
        {addBulkCard ? (
          <Header title="Add Bulk Cards" subtitle="Owl Store > Add Bulk Card" />
        ) : (
          <></>
        )}
        {settings ? (
          <Header title="Settings" subtitle="Owl Store > Setting" />
        ) : (
          <></>
        )}
      </Box>

      <Container maxWidth="lg" sx={{p:5, mt: 3, display: "flex", }}>
        <Box sx={{ width: "50%" }}>
          {homeTab ? (
            <ActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<HomeIcon />}
              onClick={onClickHomeTab}
            >
              Home
            </ActiveTabBtn>
          ) : (
            <NotActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<HomeIcon />}
              onClick={onClickHomeTab}
            >
              Home
            </NotActiveTabBtn>
          )}
          <br />

          {addCardTab ? (
            <ActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<AddIcon />}
              onClick={onClickAddCardTab}
            >
              Add Cards
            </ActiveTabBtn>
          ) : (
            <NotActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<AddIcon />}
              onClick={onClickAddCardTab}
            >
              Add Cards
            </NotActiveTabBtn>
          )}
          <br />

          {addBulkCardTab ? (
            <ActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<AddIcon />}
              onClick={onClickAddBulkCardTab}
            >
              Bulk Add Cards
            </ActiveTabBtn>
          ) : (
            <NotActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<AddIcon />}
              onClick={onClickAddBulkCardTab}
            >
              Bulk Add Cards
            </NotActiveTabBtn>
          )}

          <br />
          {settingsTab ? (
            <ActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<SettingsIcon />}
              onClick={onClickSettingsTab}
            >
              Settings
            </ActiveTabBtn>
          ) : (
            <NotActiveTabBtn
              variant="contained"
              sx={{ mt: 2, borderRadius: 2, width: "50%" }}
              startIcon={<SettingsIcon />}
              onClick={onClickSettingsTab}
            >
              Settings
            </NotActiveTabBtn>
          )}
        </Box>

        <Box sx={{ml:-20,width:'70%'}}>
          {homeTab ? <HomePage /> : <></>}
          {addCardTab ? <AddCard /> : <></>}
          {addBulkCardTab ? <BulkAddCards /> : <></>}
          {settingsTab ? <Settings /> : <></>}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
