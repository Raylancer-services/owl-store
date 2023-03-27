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

const OrderDetailsExpiryDate = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [cardStatus, setCardStatus] = useState<any>();
  const [showCvv, setShowCvv] = useState(false);

  let expiry_date = moment(props?.expiryDate).format("MM/YY");

  //Check card validation {Dead/Alive}
  async function checkCardValidation() {
    setLoading(true);
    const [err, res] = await Api.checkCard(
      props?.cardNumber,
      // expiry_date,
      // props?.cvv
    );
    if (err) {
      console.log(err);
    }
    if (res) {
      if (
        res?.data === `'str' object has no attribute 'decode'` ||
        res?.data === `INVALID RESPONSE❌ Please try again!`
      ) {
        setCardStatus(res?.data);
      } else {
        let resStr = res?.data?.split(" ");
        setCardStatus(resStr[0]);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const checkCard = async () => {
      await checkCardValidation();
    };
    checkCard();
  }, [props?.cartItems]);

  const onClickHandler = async () => {
    await checkCardValidation();
  };

  const updateOrderStatus = async() =>{
    setShowCvv(true)
    const [err,res] = await Api.updateOrderRefundStatus(props?.orderId)
    if(res){
      console.log(res,"updateOrderStatus Refund res")
    }
  }


  return (
    <>
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          {cardStatus === "LIVE" ? (
            <Box>
              {showCvv ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "medium",
                      //   color: "red",
                      fontWeight: "bold",
                      // mt: 1,
                    }}
                  >
                    {moment(props?.expiryDate).format("MM-YYYY")}
                  </Typography>
                  <Box onClick={() => setShowCvv(false)}>
                    <VisibilityOffIcon />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "medium",
                      //   color: "red",
                      fontWeight: "bold",
                      mt: 0.5,
                    }}
                  >
                    *****
                  </Typography>
                  <Box onClick={updateOrderStatus}>
                    <VisibilityIcon />
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "medium",
                    // color: "red",
                    fontWeight: "bold",
                    // mt: 1,
                  }}
                >
                  *****
                </Typography>
              </Box>
            </>
          )}

          {cardStatus === `'str' object has no attribute 'decode'` ||
          cardStatus === `INVALID RESPONSE❌ Please try again!` ? (
            <Box>
              <ColorButton variant="contained" onClick={onClickHandler}>
                <CachedIcon />
              </ColorButton>
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetailsExpiryDate;
