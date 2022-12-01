import { React, useState } from 'react'
import { Grid, Typography, Box, Button, Stack, Select, MenuItem, FormControl, InputLabel, TextField, Avatar, Divider, Alert, Snackbar, Paper, CircularProgress, Drawer, Table, TableBody, TableCell, TableContainer, Chip, TableRow } from '@mui/material';
import axios from 'axios';


export default function DepositInfo(props) {
  const { data, fun } = props;
  let temp=data;
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');
  const [showForm, setShowForm] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [showbtn, setshowbtn] = useState(true)
  //Common Functions For All
  const snackClose = () => {
    setAlertShow(false);
  }



  const accept=()=>{
    let info=JSON.parse(localStorage.getItem('crzn'));
    let token=info.token;
    let data=new FormData();
    data.append('user_id',temp.user_id);
    data.append('user_type',temp.user_type);
    data.append('amount',temp.amount); 
    data.append('id',temp.id); 
    const instance = axios.create({
      baseURL: 'http://localhost:9000/api/',
      headers: {
                  'Authorization': 'Bearer '+token,
                  "Content-Type": "multipart/form-data"
               }
    });

    instance.post('deposit/accept',data).then((res)=>{
      setshowbtn(false)
      setAlertShow(true);
      setMessage("Deposit Information Accepted");
      setaAertColor('success');
      fun(Math.random())

    }).catch((err)=>{console.log(err.response.data)});



  }

  const reject=()=>{
    if(remarks.length<5){
      setAlertShow(true);
      setMessage("Please Mentione The Reason");
      setaAertColor('error');
    }
    else {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let data=new FormData();
      data.append('id',temp.id);
      data.append('remarks',remarks);
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });

      instance.post('deposit/reject',data).then((res)=>{
        setshowbtn(false)
        setAlertShow(true);
        setMessage("Deposit Information Rejected");
        setaAertColor('success');
        setRemarks('');
        fun(Math.random());

      }).catch((err)=>{console.log(err.response.data)});

    }

  }

  return (
    <Grid container sx={{ 'px': '5%', 'textAlign': 'center!important', 'display': 'block', 'my': '2%', 'fontFamily': 'Playfair Display!important' }} >
      <Typography align={'center'} variant={'h5'} sx={{ 'marginBottom': '5%' }}>Deposit Information</Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table >
            <TableBody>
              <TableRow  >
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>  Deposit Id </TableCell>
                <TableCell align="left" scope="row">{data.id} </TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>  Deposit Date & Time </TableCell>
                <TableCell align="left" scope="row">{data.date_time.replace('T', ' ').replace('.000Z', '')} </TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> User Type  </TableCell>
                <TableCell align="left" scope="row"><Chip label={data.user_type == 1 ? "Customer" : data.mode == 2 ? "Associate" : "Employee"}></Chip></TableCell>
              </TableRow>
              <TableRow  >
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Amount  </TableCell>
                <TableCell align="left" scope="row">{data.amount}</TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Transaction Mode  </TableCell>
                <TableCell align="left" scope="row"><Chip label={data.mode == 1 ? "Bank Deposit" : data.mode == 2 ? "Upi/IMPS" : "Others"}></Chip></TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> User Id  </TableCell>
                <TableCell align="left" scope="row">{data.user_id}</TableCell>
              </TableRow>
              <TableRow  >
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Status  </TableCell>
                <TableCell align="left" scope="row"><Chip label={data.status == 0 ? "Pending" : data.status == 1 ? "Success" : "Rejected"} color={data.status == 0 ? "info" : data.status == 1 ? "success" : "error"}></Chip></TableCell>
                {
                  data.doc ? <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> <Button href={`http://localhost:9000/uploads/images/${data.doc}`} target="_blank">View Payment Slip</Button> </TableCell> : <>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>Transaction Id </TableCell>
                    <TableCell align="left" scope="row">{data.reference}</TableCell>
                  </>
                }

              </TableRow>
              {
                data.status == 0 ? <TableRow>

                  <TableCell align="center" scope="row">
                {
                  showbtn?    <Stack direction="row" spacing={2}>
                  {
                    showForm ? <>

                      <TextField label="Reason" type="text" required fullWidth InputLabelProps={{ shrink: true }} value={remarks} onChange={(e) => {
                        setRemarks(e.target.value);
                      }} />
                      <Button variant="outlined" color="success" size='small' onClick={reject}>Save</Button>

                    </> : <><Button variant="outlined" color="success" onClick={accept} >Accept</Button>
                      <Button variant="outlined" color="error" onClick={() => setShowForm(true)}>Reject</Button></>
                  }


                </Stack>:<></>
                }

                  </TableCell>
                </TableRow> : <></>
              }


            </TableBody>
          </Table>
        </TableContainer>
      </Box>






      <Snackbar open={alertShow}
        autoHideDuration={2000} onClose={snackClose}>
        <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>

    </Grid>
  )
}

