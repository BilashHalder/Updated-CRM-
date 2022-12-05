import React from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar,List,ListItem,ListItemText,Divider,TableContainer,Table,TableCell,TableRow,Paper,TableBody  } from '@mui/material';
export default function LeaveView(props) {
  const {annual, casual, sick, bereavement,maternity, others}=props.data;
  return (
    <Box>
      <Grid container spacing={3}>
     <Grid md={12}>
     <Typography  variant={'h5'} sx={{'my':'1%'}}>Leave Information</Typography>
     <Divider/>
      <Table>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Annual </TableCell>
          <TableCell>   {annual}</TableCell>
          <TableCell sx={{fontWeight:800}}>Casual</TableCell>
          <TableCell> {casual}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Sick </TableCell>
          <TableCell>   {sick}</TableCell>
          <TableCell sx={{fontWeight:800}}>Bereavement</TableCell>
          <TableCell> {bereavement}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Others </TableCell>
          <TableCell>   {others}</TableCell> 
          <TableCell sx={{fontWeight:800}}>maternity </TableCell>
          <TableCell>   {maternity}</TableCell> 
          
        </TableRow>

        <TableRow>
          <TableCell sx={{fontWeight:800}}>Total Leave </TableCell>
          <TableCell>   {annual+casual+sick+bereavement+others+maternity} Days</TableCell>
        </TableRow>


        </Table>
     </Grid>
      </Grid>
     
    </Box>
    
  )
}

