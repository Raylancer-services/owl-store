import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import * as Api from "../../services/api";
import moment from "moment";

const News = () => {
  const [news, setNews] = useState<any>();
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getNews();

      if (err) {
        console.error(err);
      }
      if (res) {
        setNews(res?.data);
      }
    };
    init();
  }, []);

  return (
    <Box>
      <Navbar />
      <Header title="News" subtitle="Owl Store > News" />
      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          // height:'200vh'
          // p:3
        }}
      >
        <Box>
          {news?.length > 0 &&
            news.map((o: any) => (
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

export default News;
