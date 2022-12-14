import React from 'react'
<<<<<<< HEAD
import {Grid,Table,TableBody,TableCell,TableContainer,Chip,TableRow,Paper, Typography, Divider} from '@mui/material';

export default function KycView(props) {
    const { adhar_no ,adhar_verified ,address, pan_no, pan_verified}=props.data;
  return (
  <Grid container sx={{p:1}}>
      <TableContainer component={Paper}>
        <Typography sx={{fontWeight:600}}>Your Kyc Details</Typography>
        <Divider/>
    <Table >
      <TableBody>
          <TableRow  >
            <TableCell component="th" scope="row">
              Adhar Card No 
            </TableCell>
            <TableCell align="left"  scope="row">{adhar_no} <Chip label={adhar_verified==1?"Verified":"Not Verifed"} sx={'small'} color={adhar_verified==1?"success":"error"} /></TableCell>
          </TableRow>
          <TableRow  >
            <TableCell component="th" scope="row">
              Pan Card No 
            </TableCell>
            <TableCell align="left"  scope="row">{pan_no} <Chip label={pan_verified==1?"Verified":"Not Verifed"} sx={'small'} color={pan_verified==1?"success":"error"} /></TableCell>
          </TableRow>

          <TableRow  >
            <TableCell component="th" scope="row">
              Address 
            </TableCell>
            <TableCell align="left"  scope="row">{address}</TableCell>
          </TableRow>

      </TableBody>
    </Table>
  </TableContainer>
  </Grid>
=======
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
>>>>>>> 53b33bfdeffccecc00f9470431d049502329ea64
  )
}
