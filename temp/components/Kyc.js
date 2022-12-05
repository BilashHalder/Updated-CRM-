// ** React Imports
import { useState,useEffect } from 'react'
import axios from 'axios'


// ** MUI Imports
import {Grid,Typography,CardContent,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';




import OutlinedInput from '@mui/material/OutlinedInput'

import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
const Kyc = (props) => {
 const {user_id,user_type,fun}=props;

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let data = new FormData();
      data.append('user_id',user_id);
      data.append('user_type',user_type);
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      instance.post('kyc/user',data).then((res)=>{setinfo(res.data);fun(Math.random())}).catch((err)=>{console.log(err)});
    
    }
  }, [])
  
  // ** States
const [info, setinfo] = useState(null);
const [adhar, setAdhar] = useState('');
const [pan, setPan] = useState('');
const [address, setAddress] = useState('')


const [message, setMessage] = useState('This is a success alert — check it out!');
const [alertShow, setAlertShow] = useState(false);
const [alertColor, setaAertColor] = useState('error');


const snackClose=()=>{
  setAlertShow(false);
 } 


const formHandler=()=>{
  const adharRegex =new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);
  var panRegex = new RegExp(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/);
  if(!adharRegex.test(adhar)){
    setAlertShow(true);
    setMessage('Invalid Adhar Card Number!');
    setaAertColor('error');
  }
  else if(!panRegex.test(pan)){
    setAlertShow(true);
    setMessage('Invalid Pan Card Number!');
    setaAertColor('error'); 
  }
else if(address.length<20)
{
  setAlertShow(true);
  setMessage('Please Enter Your Valid Address!');
  setaAertColor('error'); 
}
else{

  let data = new FormData();
  data.append('user_id',user_id);
  data.append('user_type',user_type);
  data.append('adhar_no',adhar);
  data.append('pan_no',pan);
  data.append('address',address);
  let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
    instance.post('kyc',data).then((response)=> {
  setAlertShow(true);
  setMessage('Your Kyc Information Saved!');
  setaAertColor('success'); 
  resetForm();
    })
    .catch((err)=> {
     console.log(err);
    });


 
}

}
const resetForm=()=>{
  setAddress('');
  setAdhar('');
  setPan('');
}
  return (
    <>
 <Box>
{
  info?<CardContent>
  <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
    <Box
      sx={{
        maxWidth: 368,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Avatar
        variant='rounded'
        sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
      >
        <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
      </Avatar>
      <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }} color={'green'}>
        Your Kyc Information Verified
      </Typography>
      <Typography variant='body2'>
        Adhar Card No : {info.adhar_no}
      </Typography>
      <Divider sx={{mt:0}}></Divider>
      <Typography variant='body2'>
        Pan Card No : {info.pan_no}
      </Typography>
      <Divider sx={{mt:0}}></Divider>
      <Typography variant='body2'>
        Address : {info.address}
      </Typography>
    </Box>
  </Box>
</CardContent>:   <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>

              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Adhar Card No</InputLabel>
                  <OutlinedInput
                    label='Adhar Card No'
                    value={adhar}
                    type={'text'}
                    onChange={(e)=>{setAdhar(e.target.value)}}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
              <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Pan Card No</InputLabel>
                  <OutlinedInput
                    label='Pan Card No'
                    value={pan}
                    onChange={(e)=>{setPan(e.target.value)}}
                    type={'text'}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
              <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Address</InputLabel>
                  <OutlinedInput
                    label='Address'
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                    type={'text'}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant='h6' >Add Your Information</Typography>
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>

        <Box sx={{ mt: 11 }}>
    <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={formHandler}>
      Save 
    </Button>
    <Button
      type='reset'
      variant='outlined'
      color='secondary'
      onClick={resetForm}
    >
      Reset
    </Button>
  </Box>
      </CardContent>
}
   
</Box>
 <Snackbar open={alertShow}
 autoHideDuration={2000} onClose={snackClose}>
<Alert severity={alertColor}>{message}</Alert>
</Snackbar>
</>
  )
}

export default Kyc
