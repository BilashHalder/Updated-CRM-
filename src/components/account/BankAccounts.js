import React from 'react'
import {Grid,Box,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'


export default function BankAccounts(props) {
   const {data}=props;
  return (
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
         <Grid item xs={12} sm={12} md={12}>
        {data.length>0?<>
          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell>Account No</TableCell>
            <TableCell align="right">IFSC COde</TableCell>
            <TableCell align="right">Bank Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
                {row.account_no}
              </TableCell>
              <TableCell align="right">{row.ifsc_code}</TableCell>
              <TableCell align="right">{row.bank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>:<Typography variant="p" component="p" sx={{textAlign:'center',fontWeight:600}}> Please Add Your Bank Account!</Typography>}
         </Grid>
    </Grid>
  )
}
