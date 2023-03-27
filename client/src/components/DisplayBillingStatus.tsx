import React, { useState, useEffect } from "react";
import * as Api from "../services/api";
import { Typography } from "@mui/material";

const DisplayBillingStatus = (props: any) => {
  const [txInfo, setTxInfo] = useState<any>();
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
      {txInfo?.status_text}
    </Typography>
  );
};

export default DisplayBillingStatus;
