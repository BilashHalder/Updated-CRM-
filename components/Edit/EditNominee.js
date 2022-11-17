import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib'




export default function EditNominee(props) {
  
let {id,user_id,user_type}=props.data;

  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');


 //form states
 
 
 const [name, setName] = useState(props.data.name);
 const [dob, setDob] = useState(props.data.dob.slice(0,10));



//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 

 const formHandler=(e)=>{
  e.preventDefault();
  let regName =  /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  var q = new Date();
  var today = new Date(q.getFullYear(),q.getMonth(),q.getDate());
  var inpdate = new Date(dob);

  if(!regName.test(name)){
    setAlertShow(true);
    setMessage('Please Enter a Valid Name!');
    setaAertColor('error');
  }
  else if(today < inpdate){

    setAlertShow(true);
    setMessage('Invalid Date of Birth!');
    setaAertColor('error');
  }
  else{
  let data = new FormData();
  data.append('user_id',user_id);
  data.append('user_type',user_type);
  data.append('name',name);
  data.append('dob',dob);
  axios({
    method: "put",
    url: `${baseUrl}/nominee/${id}`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      setAlertShow(true);
      setMessage("Nominee Information Updated");
      setaAertColor('success');
      props.fun(Math.random());
      resetForm();
    })
    .catch((response)=> {
      setAlertShow(true);
      setMessage('Please Try Again Later!');
      setaAertColor('error');
    });

  }

 }

 const resetForm=()=>{
 setName('');
 setDob('');
 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add New Nominee</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Full Name"  type="text" required fullWidth  InputLabelProps={{ shrink: true}} value={name} onChange={(e)=>{
        setName(e.target.value);
      }} />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField  label="Date Of Birth" type="date"  required  fullWidth value={dob}  InputLabelProps={{ shrink: true}} onChange={(e)=>{
        setDob(e.target.value)
      }}/>
      </Grid >
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
