
import { React, useState, useEffect } from 'react'
import { Typography, Grid, Box, TextField, FormControl, Alert, Snackbar, InputLabel, Select, MenuItem, Button, Stack, Divider } from '@mui/material';
import axios from 'axios';
export default function EmployeeInfoEdit(props) {
const {data}=props;
// {
//   "id": 12,
//   "employee_id": 2,
//   "designation_id": 1,
//   "salary_id": 1,
//   "leave_id": 1,
//   "dob": "2022-12-12T18:30:00.000Z",
//   "report_to": 2,
//   "joining_date": "2022-12-13T18:30:00.000Z",
//   "acceptance_file": null,
//   "id_card": null,
//   "last_payment": null
// }



  const [message, setMessage] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');


  const [allDesg, setallDesg] = useState([]);
  const [allSalary, setallSalary] = useState([]);
  const [allemp, setallemp] = useState([]);
  const [allLeave, setallLeave] = useState([]);


  /////////////////////////////Form State....

  const [desg, setdesg] = useState(data.designation_id);
  const [salid, setsalid] = useState(data.salary_id);
  const [empId, setempId] = useState(data.report_to);
  const [leaveid, setleaveid] = useState(data.leave_id);
  const [dob, setdob] = useState(data.dob.slice(0,10));
  const [doj, setdoj] = useState(data.joining_date.slice(0,10));


  const formHandler = (e) => {
    e.preventDefault();
    if(!desg){
      setAlertShow(true);
      setMessage('Please Select a Valid Designation!');
      setaAertColor('error');
    }
    else if(!salid){
      setAlertShow(true);
      setMessage('Please Select a Valid Salary Information!');
      setaAertColor('error');
    }

    else if(empId==null){
      setAlertShow(true);
      setMessage('Please Select a Reporting Information!');
      setaAertColor('error');
    }
    else if(!leaveid){
      setAlertShow(true);
      setMessage('Please Select a Valid Leave Information!');
      setaAertColor('error');
    }
    else if(!dob){
      setAlertShow(true);
      setMessage('Please Select a Valid Date of Birth!');
      setaAertColor('error');
    }
    else if(!doj){
      setAlertShow(true);
      setMessage('Please Select a Valid Date of Joining!');
      setaAertColor('error');
    }
else{
  let temp=new FormData();
temp.append('employee_id',data.employee_id);
temp.append('designation_id',desg);
temp.append('salary_id',salid);
temp.append('leave_id',leaveid);
temp.append('dob',dob);
temp.append('report_to',empId);
temp.append('joining_date',doj);
let token=JSON.parse(localStorage.getItem('crzn')).token;
const instance = axios.create({
  baseURL: 'http://localhost:9000/api/',
  headers: {
              'Authorization': 'Bearer '+token,
              "Content-Type": "multipart/form-data"
           }
});
instance.put(`emp_info/${data.employee_id}`,temp).then((res)=>{ 
  setAlertShow(true);
  setMessage('Information Updated');
  setaAertColor('success');
}).catch((err)=>{console.log(err)});
      
}

  }



  const snackClose = () => {
    setAlertShow(false);
  }

  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem('crzn'));
      let token = info.token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "multipart/form-data"
        }
      });
      instance.get('employee').then((res) => setallemp(res.data)).catch((err) => { console.log(err) });
      instance.get('designation').then((res) => setallDesg(res.data)).catch((err) => { console.log(err) });
      instance.get('salary').then((res) => setallSalary(res.data)).catch((err) => { console.log(err) });
      instance.get('leave').then((res) => setallLeave(res.data)).catch((err) => { console.log(err) });
    }
  }, []);


  return (

    <Box component={'form'} onSubmit={formHandler}>
      <Grid container spacing={2} direction="row">
        <Divider/>
        <Grid item md={12}>
          <Typography sx={{fontWeight:800}}>Edit Others Information</Typography>

        </Grid>
        <Divider/>
        <Grid item md={4} xs={12}>
          <TextField label="Employee Id" type="number" required fullWidth disabled InputLabelProps={{ shrink: true }} value={props.id} />
        </Grid>

        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="desg">Designation</InputLabel>
            <Select label="Designation" labelId="desg" value={desg} onChange={(e) => {
              setdesg(e.target.value)
            }} >
              {
                allDesg.length == 0 ? <>
                  <MenuItem value={0}>Please Add Designation</MenuItem>
                </> :

                  allDesg.map((item) => {
                    return <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                  })
              }

            </Select>
          </FormControl>
        </Grid >


        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="salary">Salary</InputLabel>
            <Select label="Salary" labelId="salary" value={salid} onChange={(e) => {
             setsalid(e.target.value)
            }} >
              {
                allDesg.length == 0 ? <>
                  <MenuItem value={0}>Please Add Salary</MenuItem>
                </> :
                  allSalary.map((item) => {
                    let { basic, hra, conveyance, special, medical, pf, insurance, tax } = item
                    return <MenuItem key={item.id} value={item.id}>{(basic + hra + conveyance + special + medical) - (pf + insurance + tax)}</MenuItem>
                  })
              }

            </Select>
          </FormControl>
        </Grid >

        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="leave">Leave</InputLabel>
            <Select label="Leave" labelId="leave" value={leaveid} onChange={(e) => {
             setleaveid(e.target.value)
            }} >
              {
                allLeave.length == 0 ? <>
                  <MenuItem value={0}>Please Add Leave Information</MenuItem>
                </> :
                  allLeave.map((item) => {
                    const { annual, casual, sick, bereavement, maternity, others } = item
                    return <MenuItem key={item.id} value={item.id}>{(annual + casual + sick + bereavement + maternity + others)}</MenuItem>
                  })
              }

            </Select>
          </FormControl>
        </Grid >

        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="report">Report To</InputLabel>
            <Select label="Report To" labelId="report" value={empId} onChange={(e) => {
             setempId(e.target.value)
            }}  >
              <MenuItem value={0}>Admin</MenuItem>
              {
                allemp.length != 0 ?

                  allemp.map((item) => {
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  }) : <></>

              }

            </Select>
          </FormControl>
        </Grid >

        <Grid item md={4} xs={12}>
          <TextField label="Date Of Birth" type="date" required fullWidth InputLabelProps={{ shrink: true }} value={dob} onChange={(e) => { setdob(e.target.value) }} />
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField label="Joining Date" type="date" required fullWidth InputLabelProps={{ shrink: true }} value={doj} onChange={(e) => { setdoj(e.target.value) }} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Stack direction={'row'} spacing={3} sx={{ marginTop: 3 }}>
            <Button variant='outlined' color='success' type={'submit'}>Save</Button>
            <Button variant='outlined' color='error'>Reset</Button>
          </Stack>
        </Grid>
        <Grid>
        </Grid>
      </Grid>
      <Snackbar open={alertShow}
        autoHideDuration={2000} onClose={snackClose}>
        <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>

    </Box>
  )
}
