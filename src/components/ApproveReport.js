import React from 'react'
import {Grid,Box,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'
import {Item} from '../../util/lib'

export default function ApproveReport(props) {
   const {data}=props;
  return (
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
         <Grid item xs={12} sm={12} md={12}>
         <Item>
        {data.length>0?<>
          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell>Report Date</TableCell>
            <TableCell align="right">Employee Id</TableCell>
            <TableCell align="right">View</TableCell>
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
        </>:<Typography variant="h6" component="h6" sx={{textAlign:'center'}}> Not Wrok Report Pending to Approve</Typography>}
        </Item>
         </Grid>
    </Grid>
  )
}
