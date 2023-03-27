import React, { useState, useEffect } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import TableComp from "../Table";
import * as Api from "../../services/api";
const CardList = (props:any) => {
  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ borderRadius: 5, p: 3 }}>
        {props?.cardList?.length === 0 || props?.cardList === undefined ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#EE2B70", fontWeight: 600 }}
          >
            No Cards Found!
          </Typography>
        ) : (
          <>
            <TableComp cardList={props?.cardList} />
          </>
        )}
      </Card>
    </Container>
  );
};

export default CardList;
