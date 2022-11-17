import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import EmployeeInfoNew from './EmployeeInfoNew';
import {baseUrl} from '../../util/lib';

export default function EmployeeNew() {
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

  //Form Data
    //Form Data

const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [gender, setGender] = useState('');
const [img, setImg] = useState(null);
const [empid, setEmpid] = useState(null);
const [other, setOthers] = useState(false)



//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  let emailReg= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  e.preventDefault();
if(name.length<4){
  setAlertShow(true);
  setMessage('Please Enter a Valid Name!');
  setaAertColor('error');
}
else if(!emailReg.test(email)){
  setAlertShow(true);
  setMessage('Please Enter a Valid Email!');
  setaAertColor('error');
}
else if(phone.toString().length!=10){
  setAlertShow(true);
  setMessage('Please Enter a Valid Phone Number!');
  setaAertColor('error');
}
else if(!gender){
  setAlertShow(true);
  setMessage('Please Select Gender!');
  setaAertColor('error');
}
else if(!img){
  setAlertShow(true);
  setMessage('Please Upload Image ');
  setaAertColor('error');
}
else if(img.size > 300000){
  setAlertShow(true);
  setMessage('Please Upload Image Less Than 300Kb');
  setaAertColor('error');
  
}

else{


  let data = new FormData();
  data.append('name',name);
  data.append('gender',gender);
  data.append('email',email);
  data.append('phone',phone);
  data.append('image',img);
  axios({
    method: "post",
    url: `${baseUrl}/employee`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      setAlertShow(true);
      setMessage("Employee Information Saved");
      setaAertColor('success');
      resetForm();
    })
    .catch((response)=> {
      setAlertShow(true);
      if(response.response.data.message)
      setMessage(response.response.data.message);
      else
      setMessage('Please Try Again Later!');
      setaAertColor('error');
    });
}

 }

 const resetForm=()=>{
  setName('');
  setEmail('');
  setPhone('');
  setGender('');
  setImg(null);
 }



  return (

    other?<EmployeeInfoNew emp_id={empid}></EmployeeInfoNew>:<Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
   <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add New Employee</Typography>
  <Box component='form' onSubmit={formHandler} >
  <Grid container spacing={2} direction="row">
   <Grid item md={4} xs={12}>
   <TextField label="Full Name"  type="text" required fullWidth  InputLabelProps={{ shrink: true}}  value={name} onChange={(e)=>{
     setName(e.target.value);
   }}  />
   </Grid>
   <Grid item md={4} xs={12}>
   <TextField label="Email Id"  type="email" required fullWidth  InputLabelProps={{ shrink: true}} value={email} onChange={(e)=>{
     setEmail(e.target.value);
   }}  />
   </Grid>

   <Grid item md={4} xs={12}>
   <TextField label="Phone No"  type="number" required fullWidth  InputLabelProps={{ shrink: true}} value={phone} onChange={(e)=>{
     setPhone(e.target.value);
   }}  />
   </Grid>

   <Grid item md={4} xs={12}>
   <FormControl fullWidth>
     <InputLabel id="gender">Gender</InputLabel>
     <Select label="Gender"  labelId="gender" value={gender} onChange={(e)=>{
     setGender(e.target.value);
   }}>
       <MenuItem value={1}>Male</MenuItem>
       <MenuItem value={2}>Female</MenuItem>
       <MenuItem value={3}>Others</MenuItem>
     </Select>
   </FormControl>
   </Grid >
   <Grid item md={4} xs={12}>
   <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
Upload Image
<input type="file"  hidden accept="image/png, image/jpeg" onChange={(e)=>{
     setImg(e.target.files[0]);
     console.log(e.target.files[0]);
   }}  />
</Button>
   </Grid>

   <Grid item md={4} xs={12} >
   <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
   <Button variant="outlined" type={'submit'} color="success">Save</Button>
   <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
  </Stack>
   </Grid>
   <Grid item md={4} xs={6} >
        {img?<img src={URL.createObjectURL(img)} height={100} width={100}></img>:<></>}
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
