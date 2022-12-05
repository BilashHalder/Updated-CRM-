
import { Grid, Chip,Typography,Table,TableBody,TableCell,TableContainer,TableRow,Paper, Divider, Button, Stack } from '@mui/material';
import axios from 'axios';
import React,{useState} from 'react'
export default function LeaveRequestView(props) {
    const {data,fun}=props;
    const [showbtn, setshowbtn] = useState(true);
    const [status, setstatus] = useState(data.status)
    const accept=(id)=>{
      setshowbtn(false);
      let token=JSON.parse(localStorage.getItem('crzn')).token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
     instance.get(`leave_application/accept/${id}`).then((res)=>{console.log(res.data)
      fun(Math.random())}).catch((err)=>{console.log(err)});

      setstatus(1);
      console.log(id);
    }
    const reject=(id)=>{
      setshowbtn(false);
      let token=JSON.parse(localStorage.getItem('crzn')).token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      instance.get(`leave_application/reject/${id}`).then((res)=>{console.log(res.data)
      fun(Math.random())}).catch((err)=>{console.log(err)});
      setstatus(2);
      console.log(id);
    }
  return (
    <Grid container sx={{p:4}}>
      <Grid item md={12}>

      <Typography sx={{textAlign:'center',fontWeight:800}} variant={'h5'}>Leave Request Details</Typography>
<Divider/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody sx={{marginTop:5}}>
            <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell scope="row" sx={{fontWeight:800}}>Leave Requset Id </TableCell>
              <TableCell align="right">{data.id}</TableCell>
              <TableCell align="right" sx={{fontWeight:800}}>Employee Id </TableCell>
              <TableCell align="right">{data.employee_id}</TableCell>
              <TableCell align="right" sx={{fontWeight:800}}>Leave Type</TableCell>
              <TableCell align="right">{data.category}</TableCell>
            </TableRow>

            <TableRow  >
              <TableCell scope="row" sx={{fontWeight:800}}>Leave From Date  </TableCell>
              <TableCell align="right">{data.from_date.slice(0,10)}</TableCell>
              <TableCell align="right" sx={{fontWeight:800}}>To Date </TableCell>
              <TableCell align="right">{data.to_date.slice(0,10)}</TableCell>
              <TableCell align="right" sx={{fontWeight:800}}>Total Days</TableCell>
              <TableCell align="right">{data.total_days}</TableCell>
            </TableRow>

            <TableRow  >
              <TableCell scope="row" sx={{fontWeight:800}}>Application Date  </TableCell>
              <TableCell align="right">{data.application_time.replace('T',' ').replace('.000Z','')}</TableCell>
              <TableCell align="right" sx={{fontWeight:800}}>Status </TableCell>
              <TableCell align="right"><Chip label={status == 0 ? "Pending" : status == 1 ? "Accepted" : "Rejected"} color={status == 0 ? "info" : status == 1 ? "success" : "error"}></Chip></TableCell>
            </TableRow>


            <TableRow >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{
              status==0 && showbtn?<><Stack direction="row" spacing={2}>
                <Button variant='outlined' color='success' onClick={()=>{accept(data.id)}}>Accept</Button>
                <Button variant='outlined' color='error' onClick={()=>{reject(data.id)}}>Reject</Button></Stack></>:<></>
            }</TableCell>
            


            </TableRow>


        </TableBody>
      </Table>
    </TableContainer>


      </Grid>

    </Grid>
  )
}
