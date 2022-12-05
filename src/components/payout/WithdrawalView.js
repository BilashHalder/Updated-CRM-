import React,{useState} from 'react'
import {Grid,Button, Input, Stack, Divider} from '@mui/material'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip'

export default function WithdrawalView(props) {
  const {id,user_type,user_id,amount,account,ifsc_code,reference_id,request_time,status}=props.data;
 
  return (
   <Grid container>

    <Grid md={12}>
      <Typography variant='h6' component='h6'>Withdrawal Request Information</Typography>
      <Divider/>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Request Id </TableCell>
              <TableCell align="right">{id}</TableCell>
              <TableCell component="th" scope="row"> Withdrawal Amount</TableCell>
              <TableCell align="right">{amount}</TableCell>
            </TableRow>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">User Id</TableCell>
              <TableCell align="right">{user_id}</TableCell>
              <TableCell component="th" scope="row">User Type </TableCell>
              <TableCell align="right"><Chip label={user_type==1?"Customer":"Associate"} /></TableCell>
            </TableRow>

            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Account No </TableCell>
              <TableCell align="right">{account}</TableCell>
              <TableCell component="th" scope="row">IFSC CODE </TableCell>
              <TableCell align="right">{ifsc_code}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell> Withdrawal Request Time</TableCell>
              <TableCell align="right">{request_time.replace('T',' ').replace('.000Z','')}</TableCell>
              <TableCell component="th" scope="row">Status </TableCell>
              <TableCell align="right"> <Chip label={status==0?"Pending":status==1?"Success":"Rejected"} color={status==0?"primary":status==1?"success":"error"} />
              </TableCell>
            </TableRow>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
             <TableCell></TableCell>
             <TableCell> <Stack direction={'row'} spacing={6} sx={{marginTop:5}}>
                <Button variant='outlined' color={'success'}>Accept</Button>
                <Button variant='outlined' color={'error'}>Reject</Button>
              </Stack></TableCell>
           
            </TableRow>

         

        </TableBody>
      </Table>
    </TableContainer >
    </Grid>
   </Grid>
  )
}
