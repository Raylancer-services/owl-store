import * as Api from "../../services/api";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#EE2B70",
    backgroundColor: "#FDE7EF",
    "&:hover": {
      backgroundColor: "#EE2B70",
      color: "white",
    },
  }));
const DisplayDepositUrl = (props: any) => {
  const [txInfo, setTxInfo] = useState<any>();

  console.log({props});
//   useEffect(() => {
//     const init = async () => {
//       const [error, response] = await Api.getTxInfo(props?.txID);
//       if (error) {
//         console.log(error);
//       }
//       setTxInfo(response?.data?.transaction_info);
//     };
//     init();
//   }, [props?.txID]);

const handleOpen = () =>{
    window.open(props?.url)
}
  return (
    <>
      {txInfo?.status_text === "Cancelled / Timed Out" ? (
        <>
          <Typography variant="body1" sx={{ color: "red" }}>
            Link Expired!
          </Typography>
        </>
      ) : (
        <>
          {/* <a href={props?.url}>Go to this Link to complete your payment.</a> */}
          <ColorButton
           variant="contained"
        //    startIcon={<AddIcon />}
           onClick={handleOpen}
          >
           Deposit link
            </ColorButton>
        </>
      )}
    </>
  );
};

export default DisplayDepositUrl;
