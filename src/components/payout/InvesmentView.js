import React,{useState} from 'react'
import {Grid,Button, Input, Stack} from '@mui/material'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip'
import InvesmentPayouts from '../invesment/InvesmentPayouts';

export default function InvesmentView(props) {
  const {id,user_id,user_type,ammount,date_time,roi,nominee_id,account_no,ifsc_code,agreement_file,status,withdrw_req_time,is_send,last_payment}=props.data;

const totaldays=31;
const monthdays=31;


const perday=(parseFloat(ammount)*(parseFloat(roi)/100))/monthdays;
const [total, setTotal] = useState(parseFloat(perday*totaldays).toFixed(2))
 
  return (
      <Grid container spacing={6} sx={{p:4}}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5' sx={{textAlign:'center'}}>Invesment Details</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
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
              <TableCell component="th" scope="row">IFSC CODE </TableCell>
              <TableCell align="right">{ifsc_code}</TableCell>
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

            {
            agreement_file? <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row"></TableCell>
          </TableRow>:<></>
           }

        </TableBody>
      </Table>
    </TableContainer >
      </Grid>

      <Grid item xs={12} md={7}>
        <Table>
        <TableRow>
            <TableCell>Last Payment Date : </TableCell>
            <TableCell>{last_payment.slice(0,10)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Days In Month :  </TableCell>
            <TableCell>{monthdays}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Days Invesment : </TableCell>
            <TableCell>{totaldays} </TableCell>
          </TableRow>


          <TableRow>
          <TableCell>ROI : {roi} </TableCell>
            <TableCell>Ammount : {ammount}</TableCell>
          </TableRow>

          <TableRow>
          <TableCell>Total Pay : </TableCell>
            <TableCell><Input type={'text'} value={total}/> </TableCell>
          </TableRow>

        </Table>

        <TableRow>
          <Stack direction={'row'} sx={{marginTop:5}} spacing={3}>
            <Button variant='outlined' color={'success'}>Send To Wallet </Button>
            <Button variant='outlined' >Send To Bank Account </Button>
          </Stack>
        </TableRow>
      </Grid>

      <Grid md={12}>
      <InvesmentPayouts id={id}/>
      </Grid>
    </Grid>
  )
}
