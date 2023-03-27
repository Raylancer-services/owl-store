import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Icon } from "@iconify/react";
import { pink } from "@mui/material/colors";
import * as Api from "../../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const CreateTicketModel = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleOnSubmit = async () => {
    const [err, res] = await Api.createTicket(title, content);

    if (err) {
      toast.error(err?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (res) {
      toast.success("Ticket created!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      props?.getTickets();
      props.handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ColorButton variant="contained" onClick={props?.handleClose}>
              <CloseIcon />
            </ColorButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack direction={{ xs: "column", sm: "column" }} spacing={5}>
              <TextField
                required={true}
                fullWidth
                id="title"
                label="Title"
                variant="outlined"
                onChange={onChangeTitle}
                // disabled
              />
              <TextField
              multiline
              rows={4}
                required={true}
                fullWidth
                id="content"
                label="Content"
                variant="outlined"
                onChange={onChangeContent}
                // value={user?.email_id}
                // disabled
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
          >
            <ColorButton
              variant="contained"
              onClick={handleOnSubmit}
              // disabled={!amount}
            >
              {" "}
              Submit
            </ColorButton>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTicketModel;
