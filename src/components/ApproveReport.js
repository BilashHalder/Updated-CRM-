import React,{useState} from 'react'
import {Grid,Box,Typography,Paper,Button ,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Drawer } from '@mui/material'
import {Item} from '../../util/lib'
import ReportView from './ReportView';

export default function ApproveReport(props) {
   const {data,fun}=props;
   const [open, setOpen] = useState(false);
   const [view, setview] = useState(null)

   const showPreview=(report,fun)=>{
    setview(report);
    setOpen(true);
   }
  return (
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
         <Grid item xs={12} sm={12} md={12}>
         <Item>
        {data.length>0?<>
          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center" >Report Id</TableCell>
            <TableCell align="center" >Employee Id</TableCell>
            <TableCell align="center" >Report Date</TableCell>
            <TableCell align="center" >Login Time</TableCell>
            <TableCell align="center" >Logout Time</TableCell>
            <TableCell align="center">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell align="center" component="th" scope="row">{row.report_id} </TableCell>
              <TableCell align="center">{row.employee_id}</TableCell>
              <TableCell align="center">{row.report_date.slice(0,10)}</TableCell>
              <TableCell align="center">{row.start_time}</TableCell>
              <TableCell align="center">{row.submit_time}</TableCell>
              <TableCell align="center"><Button variant={'outlined'} color="primary" size={'small'} onClick={()=>showPreview(row,fun)}>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>:<Typography variant="h6" component="h6" sx={{textAlign:'center'}}> Not Wrok Report Pending to Approve</Typography>}
        </Item>
         </Grid>

         <Drawer  anchor={'top'} open={open}  onClose={()=>{setOpen(false)}} >
            <ReportView data={view} fun={fun}/>
          </Drawer>


    </Grid>
  )
}
