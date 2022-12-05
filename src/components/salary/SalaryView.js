
import React from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar,List,ListItem,ListItemText,Divider,TableContainer,Table,TableCell,TableRow,Paper,TableBody  } from '@mui/material';
export default function SalaryView(props) {
  const {basic,hra,conveyance,special,medical,pf,insurance,tax,id}=props.data;
  let total=basic+hra+conveyance+special+medical+pf+insurance+tax;
  let deduct=+pf+insurance+tax;


  return (
   <Box>
     <Typography align={'center'} variant={'h5'} sx={{'my':'1%'}}>Salary Information</Typography>
    <Grid container spacing={3}>
        <Grid item md={12} xs={12} sx={{'p':'5%'}}>
       
        <Table>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Basic </TableCell>
          <TableCell>  ₹ {basic}</TableCell>
          <TableCell sx={{fontWeight:800}}>Insurance</TableCell>
          <TableCell>₹ {insurance}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>HRA </TableCell>
          <TableCell>  ₹ {hra}</TableCell>
          <TableCell sx={{fontWeight:800}}>PF</TableCell>
          <TableCell>₹ {pf}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Conveyance </TableCell>
          <TableCell>  ₹ {conveyance}</TableCell>
          <TableCell sx={{fontWeight:800}}>Tax</TableCell>
          <TableCell>₹ {tax}</TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Special </TableCell>
          <TableCell>  ₹ {special}</TableCell>
         
          <TableCell sx={{fontWeight:800}}>CTC Per Month </TableCell>
          <TableCell>₹ {total}</TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:800}}>Medical </TableCell>
          <TableCell>  ₹ {medical}</TableCell>
          <TableCell sx={{fontWeight:800}}>Insurance +  PF +  Tax </TableCell>
          <TableCell>₹ {deduct}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell sx={{fontWeight:800}}>Total Salary </TableCell>
          <TableCell>  ₹ {total-deduct}</TableCell>
        </TableRow>
        </Table>
      </Grid >
    </Grid>
   </Box>
  )
}
