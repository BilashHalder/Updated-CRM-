import React from 'react'
import {Grid,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'
import {Item} from '../../util/lib'

export default function Nominees(props) {
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
            <TableCell>Nominee Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.dob.slice(0,10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>:<Typography variant="h6" component="h6" sx={{textAlign:'center'}}> Not Nominee Information Added!</Typography>}
        </Item>
         </Grid>
    </Grid>
  )
}
