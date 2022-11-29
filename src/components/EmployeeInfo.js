import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Grid,Table,TableBody,TableCell,TableContainer,TableRow,Paper,Button,Input} from '@mui/material'

export default function EmployeeInfo() {
  const [info, setInfo] = useState(null);
  const [others, setOthers] = useState(null);
  const [id, setId] = useState(null);
  const [report, setReport] = useState(null);
  const [desg, setDesg] = useState(null);





  const [flag, setflag] = useState(0);
  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let id=info.id;
      setId(id);
      let data=new FormData();
      data.append('user_id',id);
      data.append('user_type',1);

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
  
      instance.get(`employee/${id}`).then((res)=>setInfo(res.data)).catch((err)=>{console.log(err)});
      instance.get(`emp_info/${id}`).then((res)=>{
        setOthers(res.data);
        if(res.data.report_to)
        {
            instance.get(`employee/${res.data.report_to}`).then((res)=>setReport(res.data)).catch((err)=>{console.log(err)});  
        }

        if(res.data.designation_id)
        {
            instance.get(`designation/${res.data.designation_id}`).then((res)=>setDesg(res.data)).catch((err)=>{console.log(err)});  
        }


      }).catch((err)=>{console.log(err);setOthers(null)});
    }
   
  }, [flag])
  return (
   <Grid container>
    <Grid item md={6} sm={12}>
    {
    info? <TableContainer component={Paper}>
    <Table>
      <TableBody>
      <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
           <TableCell align="left">Employee Id </TableCell>
           <TableCell align="right">{info.id} </TableCell>
         </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell align="left">Name </TableCell>
            <TableCell align="right">{info.name} </TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell align="left">Email Id </TableCell>
            <TableCell align="right">{info.email}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell align="left">Phone No</TableCell>
            <TableCell align="right">{info.phone}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            <TableCell align="left">Gender</TableCell>
            <TableCell align="right">{info.gender==1?"Male":info.gender==2?"Female":"Others"}</TableCell>
          </TableRow>
          <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          </TableRow>

      </TableBody>
    </Table>
  </TableContainer>:<></>
    }
    </Grid>
    <Grid item md={6} sm={12}>
    {
    others?<>  <Table>
    <TableBody>
    <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
         <TableCell align="left">Date of Birth </TableCell>
         <TableCell align="right">{others.dob.slice(0,10)} </TableCell>
       </TableRow>
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell align="left">Joining Date  </TableCell>
          <TableCell align="right">{others.joining_date.slice(0,10)} </TableCell>
        </TableRow>
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell align="left">Report To </TableCell>
          <TableCell align="right">{report?`${report.name} [${report.id}]`:""}</TableCell>
        </TableRow>
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell align="left">Designation</TableCell>
          <TableCell align="right">{desg?`${desg.title}`:""}</TableCell>
        </TableRow>
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell align="left">Acceptance Letter</TableCell>
          <TableCell align="right">{others.acceptance_file?<Button>Download</Button>:<>
          </>}</TableCell>
        </TableRow>
        <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        </TableRow>

    </TableBody>
  </Table>
  </>:<></>
    }
    </Grid>
   </Grid>
  )
}
