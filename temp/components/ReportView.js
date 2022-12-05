
import { React, useState } from 'react'
import { Grid, Typography, Box, Button, Stack, Select, MenuItem, FormControl, InputLabel, TextField, Avatar, Divider, Alert, Snackbar, Paper, CircularProgress, Drawer, Table, TableBody, TableCell, TableContainer, Chip, TableRow } from '@mui/material';
import axios from 'axios';


export default function ReportView(props) {
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
      <Typography align={'center'} variant={'h5'} sx={{ 'marginBottom': '5%' }}>Report  Details</Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table >
            <TableBody>
              <TableRow  >
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>  Report Id </TableCell>
                <TableCell align="left" scope="row">{temp.report_id } </TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>  Employee Id </TableCell>
                <TableCell align="left" scope="row">{data.employee_id} </TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Report Date  </TableCell>
                <TableCell align="left" scope="row">{temp.report_date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Login Time  </TableCell>
                <TableCell align="left" scope="row">{data.start_time}</TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Logout Time </TableCell>
                <TableCell align="left" scope="row">{temp.submit_time}</TableCell>
                <TableCell align="left" scope="row"> <Button href={`https://www.latlong.net/c/?lat=${temp.login_location.split('_')[0]}&long=${temp.login_location.split('_')[1]}`} target={'_blank'} size={'small'}> View Log In Location </Button></TableCell>  
                <TableCell align="left" scope="row"> <Button href={`https://www.latlong.net/c/?lat=${temp.logout_location.split('_')[0]}&long=${temp.logout_location.split('_')[1]}`} target={'_blank'} size={'small'}> View Log Out Location </Button></TableCell>               
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container>
            <Grid item  md={5}>
            { temp.report?<><Typography component={'h6'} variant={'h6'}>Report</Typography>
            <Typography>{temp.report}</Typography></>:<></>  }
            {temp.document_url?<> <Button variant={'outlined'} color={'primary'} sx={{marginTop:5}} size={'small'} href={`http://localhost:9000/uploads/documents/${temp.document_url}`} target="_blank">View Document</Button></>:<></>}
            </Grid>
            <Grid item  md={7}>
            {
                data.status == 2 ? <>

                 
                {
                  showbtn?    <Stack direction="row" spacing={2} sx={{margin:'5%'}}>
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

                </> : <></>
              }
           </Grid>


        </Grid>
      </Box>






      <Snackbar open={alertShow}
        autoHideDuration={2000} onClose={snackClose}>
        <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>

    </Grid>
  )
}


