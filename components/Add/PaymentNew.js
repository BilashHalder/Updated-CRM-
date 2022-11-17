import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';


export default function PaymentNew() {
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(true);
  const [alertColor, setaAertColor] = useState('error');
  const [off, setOff] = useState(false);

  const offline=()=>{
    setOff(true);
  }
const online=()=>{

}

//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  console.log('submit');

 }

 const payOffline=()=>{
  console.log('aaa');
 }

 const resetForm=()=>{
  console.log('reset');
 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add Payment</Typography>
     <Box component='div' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Amount"  type="text" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>

      {
        off?<>
        <Grid item md={4} xs={12}>
      <TextField label="Date of Deposit"  type="date" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>

        <Grid item md={4} xs={12}>
      <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
  Upload Payment Slip
  <input type="file"  hidden accept="image/png, image/gif, image/jpeg" />
</Button>
      </Grid>
        
        </>:<></>
      }
   
  
      <Grid item md={4} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
      {
        off?<><Button variant="outlined" type={'submit'} color="success" onClick={payOffline}>Save Payment</Button></>:<Button variant="outlined" type={'submit'} color="success" onClick={offline}>Offline Payment</Button>
      }
      <Button variant="outlined" color="info"  onClick={online}>Pay Online</Button>
     </Stack>
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
