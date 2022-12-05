import { React, useState } from 'react'
import { Grid, Typography, Box, Button, Stack,TextField, Avatar, Divider, Alert, Snackbar, Paper, CircularProgress, Drawer, Table, TableBody, TableCell, TableContainer, Chip, TableRow } from '@mui/material';
import axios from 'axios';

export default function RequestView(props) {
    const {data,fun}=props;
    const [message, setMessage] = useState('This is a success alert — check it out!');
    const [alertShow, setAlertShow] = useState(false);
    const [alertColor, setaAertColor] = useState('error');
    const [showForm, setShowForm] = useState(true);
    const [remarks, setRemarks] = useState('');
    const snackClose = () => {
        setAlertShow(false);
      }
      const submitRequest=()=>{
      if(remarks.length<5)
      alert("Enter The Remarks");
      else{
       
        let data=new FormData();
        data.append('remarks',remarks); 
        data.append('status',1); 
        let info=JSON.parse(localStorage.getItem('crzn'));
        let token=info.token;
        const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });

          instance.put(`others/${props.data.id}`,data).then((res)=>{
            setAlertShow(true);
            setMessage("Thank You");
            setaAertColor('success');
            setShowForm(false);
            setRemarks('');
            fun(Math.random())
    
          }).catch((err)=>{console.log(err)});
      }
      }
  return (
    <Grid container sx={{ 'px': '5%', 'textAlign': 'center!important', 'display': 'block', 'my': '2%', 'fontFamily': 'Playfair Display!important' }} >
    <Typography align={'center'} variant={'h5'} sx={{ 'marginBottom': '5%' }}>Request Information</Typography>
    <Divider sx={{marginTop:0}}/>
    <Box>
      <TableContainer component={Paper}>
        <Table >
          <TableBody>
            <TableRow  >
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>  Request Id </TableCell>
              <TableCell align="left" scope="row">{data.id} </TableCell>
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}>  Request By </TableCell>
              <TableCell align="left" scope="row">{data.name} </TableCell>
                 
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Status  </TableCell>
              <TableCell align="left" scope="row"><Chip label={data.status == 0 ? "Pending" :"Resolve"} color={data.status == 0 ? "info":"success" }></Chip></TableCell>

                </TableRow>
            <TableRow  >
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Email Id  </TableCell>
              <TableCell align="left" scope="row">{data.email}</TableCell>
              
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Phone No  </TableCell>
              <TableCell align="left" scope="row">{data.phone}</TableCell>
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Request Type  </TableCell>
              <TableCell align="left" scope="row" ><Chip label={data.request_type==1?"Contact Us":data.request_type==2?"CSP Requset":"BA Requset"}> </Chip></TableCell>
         

 
            </TableRow>
            <TableRow  >
             
            </TableRow>

            <TableRow>
                 
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }} > Subject </TableCell>
              <TableCell align="left" scope="row" colSpan={2}>{data.subject}</TableCell>
              <TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Message  </TableCell>
              <TableCell align="left" scope="row">{data.message}</TableCell>
      

            </TableRow>

            <TableRow>
            {
          data.remarks?<><TableCell component="th" scope="row" sx={{ fontWeight: 900 }}> Remarks  </TableCell>
          <TableCell align="left" scope="row">{data.remarks}</TableCell></>:<></>
        }
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      {
        showForm && data.status==0?<Grid my={5}>
        <Stack direction={'row'} spacing={6}>
                       <TextField type={'text'} sx={{width:'50%'}} required label="Remarks" value={remarks} onChange={(e)=>{setRemarks(e.target.value)}}/>          
                       <Button variant='outlined' color={'primary'} onClick={submitRequest}>Save</Button>
                      
                  </Stack>
        </Grid>:<></>
      }
           
    </Box>

    <Snackbar open={alertShow}
      autoHideDuration={2000} onClose={snackClose}>
      <Alert severity={alertColor}>{message}</Alert>
    </Snackbar>

  </Grid>
  )
}
