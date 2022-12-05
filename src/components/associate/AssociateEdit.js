import {React,useState,useEffect} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
export default function AssociateEdit(props) {
const {data,fun}=props;
  useEffect(() => {
    
  if (localStorage) {

    let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });

    instance.get('employee').then((res)=>{setAllemp(res.data)}).catch((err)=>{console.log(err)});
  }
  }, [])
  

  const [message, setMessage] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

  const [allemp, setAllemp] = useState([])

const [name, setName] = useState(data.name);
const [phone, setPhone] = useState(data.phone);
const [email, setEmail] = useState(data.email);
const [gender, setGender] = useState(data.gender);
const [commission, setCommission] = useState(data.commission_rate);
const [img, setImg] = useState(data.image);
const [emp_id, setEmp_id] = useState(data.employee_id);
const [status, setStatus] = useState(data.status?true:false);
const [ref_key, setRef_key] = useState(data.referral_key);
const [asid, setId] = useState(data.id);


//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
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
else if(!emp_id){
  setAlertShow(true);
  setMessage('Please Select Employee!');
  setaAertColor('error');
}
else if(!commission){
  setAlertShow(true);
  setMessage('Please Enter Commision Rate!');
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
  data.append('commission_rate',commission);
  data.append('employee_id',emp_id);
  data.append('phone',phone);
  data.append('status',status?1:0);
  data.append('referral_key',ref_key);
//   data.append('image',img);

  let token=JSON.parse(localStorage.getItem('crzn')).token;

  const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    headers: {
                'Authorization': 'Bearer '+token,
                "Content-Type": "multipart/form-data"
             }
  });



  instance.put('associate/'+asid,data)
    .then((response)=> {
      setAlertShow(true);
      setMessage("Associate Information Updated");
      setaAertColor('success');
        fun(Math.random())
      resetForm();
    })
    .catch((err)=> {
    console.log(err)
     if(err.response && err.response.data && err.response.data.message)
     setMessage(err.response.data.message);
     else
     setMessage('Please Try Again Later!');
     setaAertColor('error');
     setAlertShow(true);
    });
}


 }

 const resetForm=()=>{
  setName('');
  setEmail('');
  setPhone('');
  setGender('');
  setEmp_id('');
  setCommission('');
  setEmp_id('');
  setRef_key('')
  setImg(null);

 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h6'} sx={{'marginBottom':'2%'}}>Update Associate Information</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Full Name"  type="text" required fullWidth  InputLabelProps={{ shrink: true}} value={name} onChange={(e)=>{
        setName(e.target.value);
      }}  />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField label="Email Id"  type="email" required fullWidth disabled  InputLabelProps={{ shrink: true}} value={email} onChange={(e)=>{
        setEmail(e.target.value);
      }}  />
      </Grid>

      <Grid item md={4} xs={12}>
      <TextField label="Phone No"  type="number" required fullWidth disabled InputLabelProps={{ shrink: true}}  value={phone} onChange={(e)=>{
        setPhone(e.target.value);
      }} />
      </Grid>

      <Grid item md={4} xs={12}>
      <TextField label="Commision Rate"  type="number" required fullWidth  InputLabelProps={{ shrink: true}}  value={commission} onChange={(e)=>{
        setCommission(e.target.value);
      }} />
      </Grid>


      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select label="Gender"  labelId="gender" value={gender} onChange={(e)=>{
        setGender(e.target.value);
      }} >
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={2}>Female</MenuItem>
          <MenuItem value={3}>Others</MenuItem>
        </Select>
      </FormControl>
      </Grid >


      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="Employee">Employee</InputLabel>
        <Select label="Select Employee"  labelId="Employee"  value={emp_id} onChange={(e)=>{
        setEmp_id(e.target.value);
      }} >
        {
            allemp.length<1?<MenuItem >No Employee Found</MenuItem>:
            
            allemp.map((item)=>{
              return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >

      <Grid item md={4} xs={12}>
      <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
        Upload Image
          <input type="file"  hidden accept="image/png, image/gif, image/jpeg"  onChange={(e)=>{
        setImg(e.target.files[0]);
      }} />
</Button>
      </Grid>
      <Grid item md={1} xs={6} my={5}>
      <FormControlLabel
        control={<Switch size="small" checked={status} onChange={(e)=>{
            setStatus(!status);
        }}  />}
        label="Status"
      />
      
      </Grid>
      <Grid item md={3} xs={6} my={5}>
      <TextField label="Referral Key"  type="text" required fullWidth  InputLabelProps={{ shrink: true}}  value={ref_key} onChange={(e)=>{
        setRef_key(e.target.value);
      }} />
      
      </Grid>


      <Grid item md={4} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
      <Button variant="outlined" type={'submit'} color="success">Update</Button>
      <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
     </Stack>
      </Grid>
      <Grid item md={4} xs={6} >
           {/* {img?<img src={URL.createObjectURL(img)} height={100} width={100}></img>:<></>} */}
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
