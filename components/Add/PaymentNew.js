import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';


export default function PaymentNew(props) {
  const {user_id,user_type,fun}=props;
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');
  const [off, setOff] = useState(false);
  const [tid, settid] = useState('')
  const [ttype, setttype] = useState(1)
  const [amount, setAmount] = useState();
  const [img, setImg] = useState(null)
//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  if(!amount || amount<1){
      setAlertShow(true);
      setMessage("Please Enter The Ammount");
      setaAertColor('error');
  }

  else if(ttype==1 && !img){
    setAlertShow(true);
    setMessage("Please Upload Transaction Receipt");
    setaAertColor('error');

  }

  else if(ttype!=1 && !tid){
    setAlertShow(true);
    setMessage("Please Enter The Transaction Id");
    setaAertColor('error');
  }
else{

  let data = new FormData();
  data.append('user_id',user_id);
  data.append('user_type',user_type);
  data.append('amount',amount);
  data.append('mode',ttype);
  if(ttype==1)
  {
    data.append('doc',img);
    data.append('reference',Math.floor(Date.now() / 1000)); 
  }
  else{
    data.append('reference',tid); 
  }

  axios({
    method: "post",
    url: `${baseUrl}/deposit`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      setAlertShow(true);
      setMessage("Transaction Request Saved");
      setaAertColor('success');
      fun();
      resetForm();
    })
    .catch((response)=> {
      setaAertColor('error');
      setAlertShow(true);
      if(response.response.data.message)
      setMessage(response.response.data.message);
      else
      setMessage('Please Try Again Later!');
    
    });
}









 }
 const resetForm=()=>{
 settid();
 setAmount(0);
 setttype(1);
 setImg('');
 }
  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add Payment Details</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Amount"  type="number"  fullWidth  InputLabelProps={{ shrink: true}}  onChange={(e)=>{setAmount(e.target.value)}} value={amount}/>
      </Grid>
      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="ttype">Transaction Type</InputLabel>
        <Select label="Transaction Type"  labelId="ttype" value={ttype} onChange={(e)=>{
            setttype(e.target.value)
        }} >
          <MenuItem value={1}>Bank Deposit</MenuItem>
          <MenuItem value={2}>Upi/IMPS</MenuItem>
          <MenuItem value={3}>Others</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      {
        ttype==1?<></>:<Grid item md={4} xs={12}>
        <TextField label="Transaction Id"  type="text"  fullWidth value={tid} onChange={(e)=>{settid(e.target.value)}}  InputLabelProps={{ shrink: true}}  />
        </Grid>
      }

     {
      ttype==1? <Grid item md={4} xs={12}>
      <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
  Upload Transaction Recipt
  <input type="file"  hidden accept="image/png, image/gif, image/jpeg"  onChange={(e)=>{setImg(e.target.files[0]); }} />
</Button>
      </Grid>:<></>
     }
  
      <Grid item md={4} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
      <Button variant="outlined" type={'submit'} color="success">Save Payment</Button>
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
