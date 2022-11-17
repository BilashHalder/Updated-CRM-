import {React,useState,useEffect} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib'


export default function AssoicateNew() {

  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');
   const [employees, setEmployees] = useState([]);
useEffect(() => {
  axios({
    method: "get",
    url: `${baseUrl}/employee`,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      // setAlertShow(true);
      // setMessage("Cutomer Information Saved");
      // setaAertColor('success');
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

  
}, [])



//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  console.log('submit');

 }

 const resetForm=()=>{
  console.log('reset');
 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add New Associate</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Full Name"  type="text" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField label="Email Id"  type="email" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>

      <Grid item md={4} xs={12}>
      <TextField label="Phone No"  type="number" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField label="Commission Rate"  type="number" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>
      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="empid">Employee</InputLabel>
        <Select label="Employee"  labelId="empid">
          <MenuItem value={1}>Emp 1</MenuItem>
          <MenuItem value={2}>Emp 2</MenuItem>
          <MenuItem value={3}>Emp 3</MenuItem>
        </Select>
      </FormControl>
      </Grid >

      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select label="Gender"  labelId="gender">
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={2}>Female</MenuItem>
          <MenuItem value={3}>Others</MenuItem>
        </Select>
      </FormControl>
      </Grid >
      <Grid item md={4} xs={12}>
      <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
  Upload Image
  <input type="file"  hidden accept="image/png, image/gif, image/jpeg" />
</Button>
      </Grid>

      <Grid item md={4} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
      <Button variant="outlined" type={'submit'} color="success">Save</Button>
      <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
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
