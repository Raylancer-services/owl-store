import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import * as Api from "../../services/api";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import moment from "moment";
import CreateTicketModel from "../../components/layouts/CreateTicketModel";
import {toast } from "react-toastify";

const Reply = (props: any) => {
  const [answer, setAnswer] = useState<any>();
  const getAnswer = async () => {
    for (const ansID of props.answerId) {
      const [err, res] = await Api.getReplyAnswer(ansID);
      if (res) {
        setAnswer(res?.data);
      }
    }
  };

  useEffect(() => {
    getAnswer();
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ textAlign: "start" }}>
          Response:
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "start" }}>
          {answer?.content}
        </Typography>
      </Box>
    </>
  );
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));
const Tickets = () => {
  const [ticket, setTicket] = useState<any>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTickets = async () => {
    const [err, res] = await Api.getTickets();

    if (res) {
      setTicket(res?.data);
    }
  };

  useEffect(() => {
    const init = async () => {
      getTickets();
    };
    init();
  }, []);

  const closeTicketHandler = async(ticketId:string) =>{
       const [err,res] = await Api.closeTicket(ticketId)
       if(err){
        toast.error(err?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
       }
       if(res){
        toast.success("Ticket closed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getTickets();
       }
  }

  return (
    <Box>
      <Navbar />
      <Header title="Tickets" subtitle="Owl Store > Tickets" />
      <Box sx={{ }}>
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
              Create new ticket
            </ColorButton>
          </Box>
        </Box>

        <Box
          sx={{
            ml: 4,
          }}
        >
          {ticket?.length > 0 &&
            ticket.map((o: any) => (
              <Card
                sx={{
                  mb: 3,
                  boxShadow: 5,
                  borderRadius: 3,
                  p: 3,
                  width: "90%",
                  mt: 4,
                }}
              >
                <>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {/*  */}
                    {o?.status === "CLOSED" ? (
                      <>
                      <ColorButton
                        variant="contained"
                        disabled
                      >
                        {o?.status}
                      </ColorButton>
                      </>
                    ) : (
                      <ColorButton
                        variant="contained"
                        startIcon={<RemoveIcon />}
                        onClick={() => closeTicketHandler(o._id)}
                      >
                        {" "}
                        Close ticket
                      </ColorButton>
                    )}
                  </Box>
                  <Typography variant="h5">{o?.title}</Typography>
                  <Typography variant="body1">{o?.content}</Typography>
                  <Typography variant="subtitle2" noWrap>
                    {moment(o?.createdAt).format("MM-DD-YYYY HH:mm")}
                  </Typography>
                </>
                {/* {o?.reply.length > 0 ? (
                  <>
                    {o?.reply.map((rep: any) => (
                      <>
                        <Typography variant="h5">Response by Admin:</Typography>
                        <Typography variant="body1">{rep}</Typography>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )} */}
                <br />
                <Reply answerId={o.reply.map((rep: any) => rep)} />
              </Card>
            ))}
        </Box>
        <CreateTicketModel
          open={open}
          handleClose={handleClose}
          getTickets={getTickets}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default Tickets;
