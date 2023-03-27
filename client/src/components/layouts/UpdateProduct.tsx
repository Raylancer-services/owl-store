import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box, Stack, TextField, Autocomplete, Typography } from "@mui/material";
import { countries } from "../../_mock/_countries";
import { USAstates } from "../../_mock/_usStates";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));
const classOption = [
  {
    value: "credit",
    label: "Credit",
  },
  {
    value: "debit",
    label: "Debit",
  },
];

const levelOption = [
  {
    value: "classic",
    label: "Classic",
  },
  {
    value: "platinum",
    label: "Platinum",
  },
];
export default function UpdateDialog(props: any) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("xl"); //xs,sm,md,false,lg,xl
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        // fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ColorButton variant="contained" onClick={props?.handleClose}>
              <CloseIcon />
            </ColorButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Update Form */}
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* Card Number */}
              <TextField
                required={true}
                fullWidth
                id="base"
                label="CC Number"
                variant="outlined"
                defaultValue={props?.item?.cardNumber}
                // onChange={onChangeCCNumber}
              />
              {/* Expiry Date */}
              <TextField
                type="date"
                fullWidth
                id="base"
                label="Expiry Date"
                variant="outlined"
                defaultValue="2017-05-24"
                InputLabelProps={{ shrink: true, required: true }}
                // onChange={onChangeExpiryDate}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* CVV */}
              <TextField
                required={true}
                fullWidth
                id="base"
                label="CVV"
                variant="outlined"
                defaultValue={props?.item?.cvv}
                // onChange={onChangeCVV}
              />
              <TextField
                required={true}
                fullWidth
                id="bankName"
                label="Bank Name"
                variant="outlined"
                defaultValue={props?.item?.bankName}
                // onChange={onChangeBankName}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* street */}
              <TextField
                required={true}
                fullWidth
                id="street"
                label="Street"
                variant="outlined"
                defaultValue={props?.item?.address?.street}
                // onChange={onChangeStreet}
              />
              {/* Mobile */}
              <TextField
                required={true}
                fullWidth
                id="mobile"
                label="Phone number"
                variant="outlined"
                defaultValue={props?.item?.address?.phoneNo}
                // onChange={onChangeMobile}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* Zip code */}
              <TextField
                required={true}
                fullWidth
                id="base"
                label="Zip Code"
                variant="outlined"
                defaultValue={props?.item?.address?.zip}
                // onChange={onChangeZip}
              />
              {/* Country */}
              <Autocomplete
                fullWidth
                id="country-select-demo"
                // sx={{ width: 400 }}
                options={countries}
                // onChange={onChangeCountry}
                defaultValue={props?.item?.address?.country}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* States */}
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={USAstates}
                // onChange={onChangeState}
                defaultValue={props?.item?.address?.state}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="States"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {/* City */}
              <TextField
                required={true}
                fullWidth
                id="zip"
                label="City"
                variant="outlined"
                defaultValue={props?.item?.address?.city}
                // onChange={onChangeCity}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* DL */}
              <TextField
                required={true}
                fullWidth
                id="zip"
                label="Driving Licence Number"
                variant="outlined"
                defaultValue={props?.item?.drivingLicenceNumber}
                // onChange={onChangeDl}
              />
              {/* SSN */}
              <TextField
                required={true}
                fullWidth
                id="ssn"
                label="Social Security Number"
                variant="outlined"
                defaultValue={props?.item?.socialSecurityNumber}
                // onChange={onChangeSsn}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* Class */}
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={classOption}
                // onChange={onChangeClass}
                defaultValue={props?.item?.class}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Class"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {/* Label */}
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={levelOption}
                // onChange={onChangeLabel}
                defaultValue={props?.item?.level}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Label"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              {/* ODetails */}
              <TextField
                required={true}
                fullWidth
                id="od"
                label="Other Details.."
                variant="outlined"
                defaultValue={props?.item?.otherDetails}
                // onChange={onChangeOtherDetails}
              />
              <TextField
                required={true}
                fullWidth
                id="od"
                label="Price"
                variant="outlined"
                defaultValue={props?.item?.price}
                // onChange={onChangePrice}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
          >
            <ColorButton variant="contained" startIcon={<EditIcon />}>
              {" "}
              Update
            </ColorButton>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
