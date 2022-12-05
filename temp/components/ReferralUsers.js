

import React from 'react'
import {Grid,Box,Chip,Stack,Avatar,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'
import {Item,imageUrl} from '../../util/lib'

export default function ReferralUsers(props) {
   const {data}=props;
  return (
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
         <Grid item xs={12} sm={12} md={12}>
         <Item>
        <Typography sx={{py:5}}>Total Referral Customer { data.length }</Typography>
        {data.length>0?<>
          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Phone No</TableCell>
            <TableCell align="right">Email Id</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
              <Stack direction="row" spacing={2}>
  <Avatar alt={row.name} src={`${imageUrl}/${row.image}`} /> 
  <Typography sx={{mt:4}}>{row.name}</Typography>
</Stack>

               
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><Chip label={row.status==1?"Active":"De-Acive"} color={row.status==1?"success":"error"} size={'small'}></Chip></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>:<Typography variant="h6" component="h6" sx={{textAlign:'center'}}> You Dont Have Any Referral Customer</Typography>}
        </Item>
         </Grid>
    </Grid>
  )
}
