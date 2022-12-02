import { React, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  TextField,
  Avatar,
  Divider,
  Alert,
  Snackbar,
  Paper,
  CircularProgress,
  Drawer,
} from "@mui/material";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LeaveApply(props) {
  const { data, fun, show } = props;
  const {
    annual,
    bereavement,
    casual,
    employee_id,
    id,
    maternity,
    others,
    sick,
  } = data;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leave_type, setleave_type] = useState('')


  
const [message, setMessage] = useState('');
const [alertShow, setAlertShow] = useState(false);
const [alertColor, setaAertColor] = useState('error');




const snackClose=()=>{
  setAlertShow(false);
 }  

 const formHandler=(e)=>{
  e.preventDefault();
  let today=new Date();
  let sdate=new Date(startDate);
  let edate=new Date(endDate);
  let diff=((edate-sdate)/(24*3600*1000))+1;
  if(!startDate || today.getTime()>sdate.getTime()){
    setAlertShow(true);
    setMessage('invalid Start Date!');
    setaAertColor('error');
  }

  else if(!endDate || today.getTime()>edate.getTime() || edate.getTime<sdate.getTime()){
    setAlertShow(true);
    setMessage('invalid End Date');
    setaAertColor('error');
  }

  else if(!leave_type){
    setAlertShow(true);
    setMessage('Please Select Leave Type');
    setaAertColor('error');
  }
else if(eval(leave_type)<diff){
  setAlertShow(true);
  setMessage(`You Have Only ${eval(leave_type)} ${leave_type} Leave`);
  setaAertColor('error');
}
  

else{

  let data = new FormData();
  data.append('employee_id',employee_id);
  data.append('category',leave_type);
  data.append('from_date',startDate);
  data.append('to_date',endDate);
  data.append('total_days',diff);
  data.append('status',0);

  let info=JSON.parse(localStorage.getItem('crzn'));
  let token=info.token;

   const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });


      instance.post('leave_application',data).then((response)=> {
        setAlertShow(true);
        setMessage('Your Leave Request Accepted Please Wait for Confirmation!');
        setaAertColor('success'); 
        fun(Math.random());
          })
          .catch((err)=> {
            setAlertShow(true);
            setMessage('Please Try Again Later!');
            setaAertColor('error');
           console.log(err);
          });
 }
 }
  return (
    <>
      {data.id ? (
        <>
          <Grid container>
            <Grid item md={12}>
              <Typography sx={{ textAlign: "center" }} variant={"h6"}>
                {" "}
                Your Remaining Leave{" "}
              </Typography>
              <Divider />
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 800 }}
                      >
                        Annual{" "}
                      </TableCell>
                      <TableCell align="right">{annual}</TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 800 }}
                      >
                        Bereavement{" "}
                      </TableCell>
                      <TableCell align="right">{bereavement}</TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 800 }}
                      >
                        Casual
                      </TableCell>
                      <TableCell align="right">{casual}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 800 }}
                      >
                        Maternity{" "}
                      </TableCell>
                      <TableCell align="right">{maternity}</TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 800 }}
                      >
                        Sick
                      </TableCell>
                      <TableCell align="right">{sick}</TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 800 }}
                      >
                        Others{" "}
                      </TableCell>
                      <TableCell align="right"> {others}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item md={12}>
              {show ? (
                <>
                  <Box sx={{ marginTop: 6 }} component="form" onSubmit={formHandler}>
                    <Typography sx={{ textAlign: "center" }} variant={"h6"}> Apply For Leave </Typography>
                    <Divider />
                    <Grid container columnSpacing={2} sx={{ my: 5 }}>
                      <Grid md={4} sx={{ px: 3 }}>
                        <TextField
                          label="Start Date"
                          type="date"
                          required
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={startDate}
                          onChange={(e)=>{setStartDate(e.target.value)}}
                        />
                      </Grid>

                      <Grid md={4} sx={{ px: 3 }}>
                        <TextField
                          label="End Date"
                          type="date"
                          required
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={endDate}
                          onChange={(e)=>{setEndDate(e.target.value)}}
                        />
                      </Grid>

                      <Grid md={4} sx={{ px: 3 }}>
                        <FormControl fullWidth>
                          <InputLabel id="leave_type">Leave Type</InputLabel>
                          <Select labelId="leave_type" value={leave_type}  onChange={(e)=>{setleave_type(e.target.value)}} >
                            <MenuItem value={"annual"}>Annual</MenuItem>
                            <MenuItem value={"bereavement"}>Bereavement </MenuItem>
                            <MenuItem value={"casual"}>Casual</MenuItem>
                            <MenuItem value={"maternity"}>Maternity</MenuItem>
                            <MenuItem value={"sick"}>Sick</MenuItem>
                            <MenuItem value={"others"}>Others</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button type={'submit'} color={'success'} variant={'outlined'} >Apply</Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ marginTop: 6 }}>
                    <Typography color={"error"}>
                      Sorry You Can't Apply For Leave Untill Previous Request
                      not Validate.
                    </Typography>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <> <Typography color={"error"}>
       You Are Not Eligble to Apply leave Please Contact To Admin.
      </Typography></>
      )}

<Snackbar open={alertShow}
 autoHideDuration={2000} onClose={snackClose}>
<Alert severity={alertColor}>{message}</Alert>
</Snackbar>

    </>
  );
}
