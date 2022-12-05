// ** MUI Imports
import {Grid,Button} from '@mui/material'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip'
import { React, useState,useEffect } from "react";

// ** Demo Components Imports


import InvesmentPayouts from './InvesmentPayouts';
import InvesmentButtons from './InvesmentButtons';


const InvesmentView = (props) => {
  const {id,user_id,user_type,ammount,date_time,roi,nominee_id,account_no,payment_id,agreement_file,status,withdrw_req_time,is_send,referral_id}=props.data;
const [nominee, setNominee] = useState();


  useEffect(() => {
   
  }, [])
  
  return (
    <Grid container spacing={6} sx={{p:4}}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5' sx={{textAlign:'center'}}>Invesment Details</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Invesment Id </TableCell>
              <TableCell align="right">{id}</TableCell>
            </TableRow>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Amount </TableCell>
              <TableCell align="right">{ammount}</TableCell>
            </TableRow>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Invesment Date </TableCell>
              <TableCell align="right">{date_time.slice(0,10)}</TableCell>
            </TableRow>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Roi </TableCell>
              <TableCell align="right">{roi}</TableCell>
            </TableRow>

            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Account No </TableCell>
              <TableCell align="right">{account_no}</TableCell>
            </TableRow>

            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row">Status </TableCell>
              <TableCell align="right"> <Chip label={status==0?"Pending":status==1?"Active":status==2?"Withdrawal":"Closed"} color={status==0?"primary":status==1?"success":status==2?"warning":"error"} />
              </TableCell>
            </TableRow>

            {
              
            withdrw_req_time? <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">Withdrw Request Date </TableCell>
            <TableCell align="right"> {withdrw_req_time.slice(0,10)}
            </TableCell>
          </TableRow>:<></>
            }
            
{/* 
            {
            agreement_file? <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row"></TableCell>
          </TableRow>:<></>
           } */}

        </TableBody>
      </Table>
    </TableContainer >
      </Grid>

      <Grid item xs={12} md={8}>
       <InvesmentPayouts id={id}  />
       <InvesmentButtons status={status} agreement={agreement_file} id={id}/>
      </Grid>
    </Grid>
  )
}

export default InvesmentView






