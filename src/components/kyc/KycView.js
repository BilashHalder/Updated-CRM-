import React from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar,List,ListItem,ListItemText,Divider,TableContainer,Table,TableCell,TableRow,Paper,TableBody,Chip  } from '@mui/material';

export default function KycView(props) {
  const {id,adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type}=props.data;
  return (
    <Grid container spacing={3}>
    <Grid md={12}>
    <Typography  variant={'h5'} sx={{'my':'1%'}}>Kyc Information</Typography>
    <Divider/>
     <Table>
       <TableRow>
         <TableCell sx={{fontWeight:800}}>KYC Identification Number </TableCell>
         <TableCell>   {id}</TableCell>
         <TableCell sx={{fontWeight:800}}>User Type</TableCell>
         <TableCell> {user_type==1?"Customer":user_type==2?"Associate":"Employee"}</TableCell>
         <TableCell sx={{fontWeight:800}}>{user_type==1?"Customer":user_type==2?"Associate":"Employee"} Id</TableCell>
         <TableCell> {user_id}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell sx={{fontWeight:800}}>Adhar Card No </TableCell>
         <TableCell>   {adhar_no}  <Chip label={adhar_verified==1?"Verified":"Not Verified"} color={adhar_verified==1?"success":"error"}/></TableCell>
         <TableCell sx={{fontWeight:800}}>Pan Card No   </TableCell>
         <TableCell> {pan_no} <Chip label={pan_verified==1?"Verified":"Not Verified"} color={pan_verified==1?"success":"error"}/></TableCell>
       </TableRow>
       </Table>
       <TableRow>
         <TableCell sx={{fontWeight:800}}>Address </TableCell>
         <TableCell>   </TableCell> 
         <TableCell >{address} </TableCell>
       </TableRow>
    </Grid>
     </Grid>
  )
}
