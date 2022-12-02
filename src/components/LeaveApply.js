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

 const formHandler=(e)=>{
  e.preventDefault();
  let today=new Date();
  let sdate=new Date(startDate);
  let edate=new Date(endDate);

  if(today.getTime()>sdate.getTime()){
    console.log("invalid Start Date");
  }

  if(today.getTime()>edate.getTime() || edate.getTime<sdate.getTime()){
    console.log("invalid End Date");
  }


  let diff=((edate-sdate)/(24*3600*1000))+1;
  console.log(diff);
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
        <>No leave </>
      )}
    </>
  );
}
