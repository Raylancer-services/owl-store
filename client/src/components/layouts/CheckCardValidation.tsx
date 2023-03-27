import styled from "@emotion/styled";
import {
  Button,
  ButtonProps,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import { Box } from "@mui/material";
import * as Api from "../../services/api";
import { toast } from "react-toastify";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const CheckCardValidation = (props: any) => {
  console.log({ props });
  const [loading, setLoading] = useState(false);
  const [cardStatus, setCardStatus] = useState<any>("INVALID");

  const checkCard = async () => {
    setLoading(true);
    let expiry_date = moment(props?.expiryDate).format("MM|YY");
    let CVV;
    let cardStr = props?.cardNumber?.split("");
    console.log("cardStr____", cardStr);
    if (cardStr[0] === "3") {
      CVV = `0${props?.cvv}`;
    } else {
      CVV = props?.cvv;
    }
    let str: any = `${props?.cardNumber}|${expiry_date}|${CVV}`;
    let cardDetailsB64 = window.btoa(str);
    const [err, res] = await Api.updateCardValidationStatus(
      props?.orderId,
      cardDetailsB64
    );
    if (err) {
      toast.error(err?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (res) {
      setCardStatus(res?.data?.data?.validationStatus);
      // console.log(res?.data?.data?.validationStatus, "update card validation response");
      if (
        res?.data?.data?.validationStatus === "DECLINED" &&
        props?.refundStatus === "false"
      ) {
        const [err, res] = await Api.refundUser(
          props?.orderId,
          props?.totalPrice
        );
        if (err) {
          const [err, res] = await Api.refundUser(
            props?.orderId,
            props?.totalPrice
          );
        }
        if (res) {
          console.log(res, "refund response");
        }
      }
    }
    // const [err, res] = await Api.checkCard(cardDetailsB64);
    // if (err) {
    //   toast.error(err?.data, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
    // if (res) {
    //   console.log(res, "card check response");
    //   setCardStatus(res?.data?.data?.status);
    // }
    setLoading(false);
  };

  const onClickHandler = () => {
    checkCard();
  };

  const onClickRecheckHandler = () => {
    checkCard();
  };

  const showCardDetails = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props?.setShowCard(event.target.checked);
    // const [err, res] = await Api.updateOrderRefundStatus(props?.orderId);
    // if (res) {
    //   console.log(res, "updateOrderStatus Refund res");
    // }
  };

  useEffect(() => {
    const init = () => {
      setCardStatus(props?.cardValidationStatus);
    };
    init();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 5 }}>
      {/* CARD STATUS == "UNDEFINED || "" */}
      {cardStatus === undefined || cardStatus === "" ? (
        <>
          {loading ? (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <ColorButton
              variant="contained"
              // startIcon={<CachedIcon />}
              onClick={onClickHandler}
            >
              Check
            </ColorButton>
          )}

          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}

      {/* CARD STATUS == "LIVE" */}
      {cardStatus === "LIVE" ? (
        <>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "medium",
              color: "green",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            {cardStatus}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props?.showCard}
                  onChange={showCardDetails}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Check details"
            />
          </FormGroup>
        </>
      ) : (
        <></>
      )}
      {/* CARD STATUS == "ERROR" */}
      {cardStatus === "ERROR" ? (
        <>
          {loading ? (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <ColorButton
              variant="contained"
              startIcon={<CachedIcon />}
              onClick={onClickRecheckHandler}
            >
              Recheck
            </ColorButton>
          )}
          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}
      {/* CARD STATUS == "DECLINED"*/}
      {cardStatus === "DECLINED" ? (
        <>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "medium",
              color: "red",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            {cardStatus}
          </Typography>
          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}
      {/* CARD STATUS == "INVALID" */}
      {cardStatus === "INVALID" ? (
        <>
          {loading ? (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <ColorButton
              variant="contained"
              startIcon={<CachedIcon />}
              onClick={onClickRecheckHandler}
            >
              Recheck
            </ColorButton>
          )}
          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default CheckCardValidation;
