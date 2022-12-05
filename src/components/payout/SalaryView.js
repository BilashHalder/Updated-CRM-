import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Grid,Button, Input, Stack, Divider} from '@mui/material'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import SalaryInfo from './SalaryInfo';
import WorkingReports from './WorkingReports';


export default function SalaryView(props) {
  const{last_payment,joining_date,employee_id,salary_id}=(props.data);
  const [workReports, setWorkReports] = useState([]);
  const [salaryInfo, setSalaryInfo] = useState(null);
  const [holidays, setholidays] = useState([])

  const workdays=26;
  const monthdays=31;
  
  
  const perday=(parseFloat(10)*(parseFloat(100)/100))/monthdays;
  const [total, setTotal] = useState(parseFloat(perday*workdays).toFixed(2))


  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;

  
      let data=new FormData();
      data.append('start_date','2022/12/01');
      data.append('end_date','2022/12/31');
      data.append('employee_id',employee_id);


      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
  
  instance.post('report/employee',data).then((res)=>setWorkReports(res.data)).catch((err)=>{console.log(err.response.data)});
  instance.post('holidays/range',data).then((res)=>setholidays(res.data)).catch((err)=>{console.log(err.response.data)});
  instance.get(`salary/${salary_id}`).then((res)=>setSalaryInfo(res.data)).catch((err)=>{console.log(err.response.data)});
    }
   
  }, [])




  return (
    <Grid container>
      {
        salaryInfo? <Grid md={5}>
        <SalaryInfo data={salaryInfo}/>
      </Grid>:<></>
      }
     
      <Grid md={7}>
        <Typography>Work Information</Typography>
        <Divider/>
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
            <TableCell>Total Working Days : </TableCell>
            <TableCell>{workdays} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>No of Holidays : </TableCell>
            <TableCell>{holidays.length} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Work Report Accepted : </TableCell>
            <TableCell>{workReports.length} </TableCell>
          </TableRow>

          
          <TableRow>
            <TableCell>Absent : </TableCell>
            <TableCell>{workdays-workReports.length} </TableCell>
          </TableRow>



          <TableRow>
          <TableCell>Total Pay : </TableCell>
            <TableCell><Input type={'text'} value={total}/> </TableCell>
          </TableRow>

          <TableRow>
            <Button sx={{marginTop:5}}variant='outlined'>Save </Button>
          </TableRow>

        </Table>
      </Grid>
<Grid md={12}>
  <Divider/>
  <Typography sx={{fontWeight:800}} component={'h6'}>Recent Work Reports</Typography>
  <Divider/>
<WorkingReports data={workReports}/>
</Grid>
    </Grid>
  )
}
