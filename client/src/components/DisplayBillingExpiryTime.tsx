import * as Api from "../services/api";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import moment from "moment";

const DisplayBillingExpiryTime = (props: any) => {
  const [txInfo, setTxInfo] = useState<any>();

  console.log(props);
  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getTxInfo(props?.txID);
      if (error) {
        console.log(error);
      }
      setTxInfo(response?.data?.transaction_info);
    };
    init();
  }, [props?.txID]);

  return (
    <Typography variant="subtitle2" noWrap sx={{ fontSize: "medium" }}>
      {moment(txInfo?.time_expires).format("DD-MM,h:mm a")}
      {/* {txInfo?.time_expires} */}
    </Typography>
  );
};

export default DisplayBillingExpiryTime;
