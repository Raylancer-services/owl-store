import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#FDE7EF',
  "&:hover": {
    backgroundColor: '#EE2B70',
  },
}));

export default function CustomizedButtons(props: any) {
  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained"> {props?.name}</ColorButton>
    </Stack>
  );
}
