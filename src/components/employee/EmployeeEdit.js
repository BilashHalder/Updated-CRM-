import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { Typography,Grid, Box,TextField,FormControl,InputLabel ,Select,MenuItem ,Button,Stack} from '@mui/material';
import EmployeeOthers from './EmployeeOthers';

export default function EmployeeEdit(props) {
  const [allsalary, setAllSalary] = useState([]);
  const [alldesignation, setAlldesignation] = useState([]);
  const [allLeave, setallLeave] = useState([]);

  
const [name, setName] = useState(props.data.name);
const [phone, setPhone] = useState(props.data.phone);
const [email, setEmail] = useState(props.data.email);
const [gender, setGender] = useState(props.data.gender);
const [img, setImg] = useState(null);
const [empid, setEmpid] = useState(props.data.id);
const [message, setMessage] = useState('This is a success alert — check it out!');
const [alertShow, setAlertShow] = useState(false);
const [alertColor, setaAertColor] = useState('error');


const resetForm=()=>{

}


  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let id=info.id;
      let data=new FormData();
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
  
      instance.get('salary').then((res)=>setAllSalary(res.data)).catch((err)=>{console.log(err)});
      instance.get('designation').then((res)=>setAlldesignation(res.data)).catch((err)=>{console.log(err)});
      instance.get('leave').then((res)=>setallLeave(res.data)).catch((err)=>{console.log(err)});
    }
   
  }, [])
  





  return (
   <Grid container>
    <Grid md={12} sx={{marginTop:10}}>
    <Typography variant='h5' component={'h5'}>Update Basic Information</Typography>
         <Box component={'form'} sx={{marginTop:10}}>
         <Grid container spacing={2} direction="row">
   <Grid item md={4} xs={12}>
   <TextField label="Full Name"  type="text" required fullWidth   InputLabelProps={{ shrink: true}}  value={name} onChange={(e)=>{
     setName(e.target.value);
   }}  />
   </Grid>
   <Grid item md={4} xs={12}>
   <TextField label="Email Id"  type="email" required fullWidth disabled InputLabelProps={{ shrink: true}} value={email} onChange={(e)=>{
     setEmail(e.target.value);
   }}  />
   </Grid>

   <Grid item md={4} xs={12}>
   <TextField label="Phone No"  type="number" required fullWidth disabled InputLabelProps={{ shrink: true}} value={phone} onChange={(e)=>{
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
      <Box>

      </Box>
    </Grid>
    <Grid md={12}>
      <EmployeeOthers id={props.data.id}/>
    </Grid>
    <Grid md={12}>
      
    </Grid>
   </Grid>
  )
}
