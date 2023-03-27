import { Typography, Box, Card } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import { _salesOverview } from "../../_mock/_salesOverview";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Image from "../../components/Image";
import vectorImg from "../../images/Vector4.png";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const HomePage = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Statistics
      </Typography>
      <Box sx={{ 
         display: 'grid',
         gap: 1,
         gridTemplateColumns: 'repeat(2, 1fr)',
      }}>
        {_salesOverview.map((progress, index) => (
          // <StatsCard progress={progress}/>
          <Box sx={{
            
          }}>
            <Card sx={{ mt: 2,p:1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                  {progress.label}
                </Typography>
                <Typography variant="subtitle2">{progress.value}</Typography>
              </Box>
              <Box>
                <ColorButton variant="contained" sx={{ width: "5%" }}>
                  <PersonIcon />
                </ColorButton>
              </Box>
            </Box>

            <Image src={vectorImg} sx={{w:'10%'}}/>
          </Card>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default HomePage;
