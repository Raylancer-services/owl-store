import {
  Box,
  Card,
  Stack,
  Divider,
  CardHeader,
  Typography,
  CardContent,
} from "@mui/material";
const OrderSummary = (props:any) => {
  return (
    <Card sx={{ mb: 3,boxShadow: 5,borderRadius:3 }}>
      <CardHeader title="Order Summary"  sx={{ color: "#EE2B70" }}/>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Total items
            </Typography>
            <Typography variant="subtitle2">
             {props?.totalItems}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle1" sx={{ color: "error.main" }}>
                $ {props?.totalPrice}
              </Typography>
              {/* <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                (VAT included if applicable)
              </Typography> */}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
