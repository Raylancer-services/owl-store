import React from 'react'
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@mui/material';

const StatsCard = (props:any) => {
    console.log(props);
    
  return (
    <Card sx={{ml:4}}>
      <CardHeader title="Sales Overview" />
      <Stack spacing={2} sx={{ p: 3 }}>
          <Stack spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
              {props?.progress.label}
            </Typography>
            {/* <Typography variant="subtitle2">{props?.progress.value}</Typography> */}
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              &nbsp;{props?.progress.value}
            </Typography>
          </Stack>
    
          {/* <LinearProgress
            variant="determinate"
            value={props?.progress.value}
            color={
              (props?.progress.label === 'Sales Total' && 'info') ||
              (props?.progress.label === 'Monthly Sales' && 'warning') ||
              'primary'
            }
          /> */}
        </Stack>
      </Stack>
    </Card>
  )
}

export default StatsCard