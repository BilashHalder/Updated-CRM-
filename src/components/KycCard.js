import React from 'react'
import {Grid,Table,TableBody,TableCell,TableContainer,Chip,TableRow,Paper} from '@mui/material';

export default function KycCard(props) {
    const { adhar_no ,adhar_verified ,address, pan_no, pan_verified}=props.data;
  return (
  <Grid container sx={{p:5}}>
      <TableContainer component={Paper}>
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
  )
}
