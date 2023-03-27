import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const Settings = () => {
  return (
    <>
      {/* <Typography variant="h4" sx={{ mt: 2 }}>
        Settings
      </Typography> */}
      <Box sx={{ display: "flex", mt:2 }}>
        <TextField
          fullWidth
          id="base"
          label="Try after 24 hours"
          variant="outlined"
          disabled
          sx={{borderLeft:'4px solid #EE2B70'}}
        />
      </Box>
      <Box sx={{ display: "flex", mt: 3 }}>
        <TextField
          fullWidth
          id="base"
          label="BTC Wallet Address"
          variant="outlined"
        />
        <ColorButton
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ ml: 2 }}
        >
          Save
        </ColorButton>
      </Box>

      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          fullWidth
          id="base"
          label="USDT TRC20 Address"
          variant="outlined"
        />
        <ColorButton
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ ml: 2 }}
        >
          Save
        </ColorButton>
      </Box>
    </>
  );
};

export default Settings;
