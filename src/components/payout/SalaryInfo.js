import React,{useState} from 'react'
import {Grid,Button, Input, Stack} from '@mui/material'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';






export default function SalaryInfo(props) {

  const {basic, hra, conveyance, medical, special, pf, insurance, tax}=props.data;
    
  return (
    <Grid container spacing={6} sx={{p:4}}>
    <Grid item xs={12} sx={{ paddingBottom: 4 }}>
      <Typography variant='h5' sx={{textAlign:'center'}}>Salary Details</Typography>
    </Grid>
    <Grid item xs={12}>
    <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableBody>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">HRA </TableCell>
            <TableCell align="right">{hra}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">Basic </TableCell>
            <TableCell align="right">{basic}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">Conveyance </TableCell>
            <TableCell align="right">{conveyance}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">Medical </TableCell>
            <TableCell align="right">{medical}</TableCell>
          </TableRow>
        
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">Special </TableCell>
            <TableCell align="right">{special}</TableCell>
          </TableRow>

          
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row"></TableCell>
            <TableCell align="right">{hra+basic+conveyance+medical+special}</TableCell>
          </TableRow>

          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">(PF + Insurance + Tax)</TableCell>
            <TableCell align="right">{pf+insurance+tax}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell component="th" scope="row">Total</TableCell>
            <TableCell align="right">{(hra+basic+conveyance+medical+special)-(pf+insurance+tax)}</TableCell>
          </TableRow>

      </TableBody>
    </Table>
  </TableContainer >
    </Grid>
    <Grid md={12}>
    </Grid>
  </Grid>
  )
}
