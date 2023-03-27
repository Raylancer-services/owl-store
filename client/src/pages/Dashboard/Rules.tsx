import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import * as Api from "../../services/api";
import moment from "moment";
const Rules = () => {
  const [rules, setRules] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getRules();

      if (err) {
        console.error(err);
      }
      if (res) {
        setRules(res?.data);
      }
    };
    init();
  }, []);
  return (
    <Box>
      <Navbar />
      <Header title="Rules" subtitle="Owl Store > Rules" />
      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          px: 1,
          // height:"150vh",
        
        }}
      >
        <Box>
          {rules?.length > 0 &&
            rules.map((o: any) => (
              <Card
                sx={{
                  mb: 3,
                  boxShadow: 5,
                  borderRadius: 3,
                  p: 3,
                  width:"90%",
                  mt: 4,
                }}
              >
                <>
                  <Typography variant="h5">{o?.title}</Typography>
                  <Typography variant="body1">{o?.content}</Typography>
                  <Typography variant="subtitle2" noWrap>
                    {moment(o?.createdAt).format("MM-DD-YYYY HH:mm")}
                  </Typography>
                </>
              </Card>
            ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Rules;
