import styled from "@emotion/styled";
import { Button, ButtonProps, Typography } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import { Box } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import * as Api from "../../services/api";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const OrderDetailsCardNumber = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [cardStatus, setCardStatus] = useState<any>('LIVE');
  const [showCvv, setShowCvv] = useState(false);

  let expiry_date = moment(props?.expiryDate).format("MM/YY");

  //Check card validation {Dead/Alive}
  // async function checkCardValidation() {
  //   setLoading(true);
  //   const [err, res] = await Api.checkCard(
  //     props?.cardNumber,
  //     expiry_date,
  //     props?.cvv
  //   );
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (res) {
  //     if (
  //       res?.data === `'str' object has no attribute 'decode'` ||
  //       res?.data === `INVALID RESPONSE❌ Please try again!`
  //     ) {
  //       setCardStatus(res?.data);
  //     } else {
  //       let resStr = res?.data?.split(" ");
  //       setCardStatus(resStr[0]);
  //     }
  //   }
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   const checkCard = async () => {
  //     await checkCardValidation();
  //   };
  //   checkCard();
  // }, [props?.cartItems]);

  // const onClickHandler = async () => {
  //   await checkCardValidation();
  // };

  const updateOrderStatus = async () => {
    setShowCvv(true);
    const [err, res] = await Api.updateOrderRefundStatus(props?.orderId);
    if (res) {
      console.log(res, "updateOrderStatus Refund res");
    }
  };

  return (
    <>
      {cardStatus === "LIVE" ? (
        <Box>
          {props?.showCard ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "medium",
                }}
              >
                {props?.cardNumber}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "medium",
                  //   color: "red",
                  //   fontWeight: "bold",
                  mt: 0.5,
                }}
              >
                {props?.cardNumber?.slice(0, 6)}...
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "medium",
                // color: "red",
                // fontWeight: "bold",
                // mt: 1,
              }}
            >
              {props?.cardNumber?.slice(0, 6)}...
            </Typography>
          </Box>
        </>
      )}

      {cardStatus === `'str' object has no attribute 'decode'` ||
      cardStatus === `INVALID RESPONSE❌ Please try again!` ? (
        <Box>
          <ColorButton variant="contained">
            <CachedIcon />
          </ColorButton>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetailsCardNumber;
