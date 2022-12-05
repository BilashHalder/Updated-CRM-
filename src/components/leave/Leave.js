import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar,List,ListItem,ListItemText,Divider  } from '@mui/material';
import axios from 'axios';


export default function Leave(props) {
   const{fun}= props
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');


//Form Inputs
const [annual, setannual] = useState('');
const [casual, setcasual] = useState('');
const [sick, setsick] = useState('');
const [maternity, setmaternity] = useState('');
const [bereavement, setbereavement] = useState('');
const [others, setothers] = useState('');








//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  if(!annual || !casual || !sick || !maternity || !bereavement || !others ){
    setAlertShow(true);
    setMessage('Please Enter Valid Leave Information!');
    setaAertColor('error');
  }
  else{
    let data = new FormData();
    data.append('annual',annual);
    data.append('casual',casual);
    data.append('sick',sick);
    data.append('maternity',maternity);
    data.append('bereavement',bereavement);
    data.append('others',others);
    let token=JSON.parse(localStorage.getItem('crzn')).token;
	 const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });

  instance.post('leave',data)
      .then((response)=> {
        setAlertShow(true);
        setMessage("Leave Information Saved");
        fun(Math.random())
        setaAertColor('success');
        resetForm();
      })
      .catch((err)=> {
        console.log(err)
        setAlertShow(true);
        setMessage('Please Try Again Later!');
        setaAertColor('error');
      });
  }


 }

 const resetForm=()=>{
  setannual('');
  setcasual('');
  setsick('');
  setmaternity('');
  setbereavement('');
  setothers('');
 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add New Leave Information</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={3} xs={6}>
      <TextField label="annual"  type="number" required fullWidth  InputLabelProps={{ shrink: true}}  value={annual}  onChange={(e)=>{
        if(e.target.value<0)
        setannual(0);
        else setannual(e.target.value);
        }}/>
      </Grid>
      <Grid item md={3} xs={6}>
      <TextField  label="casual" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={casual}  onChange={(e)=>{
        if(e.target.value<0)
        setcasual(0);
        else 
        setcasual(e.target.value);
      }}/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="sick	" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={sick}  onChange={(e)=>{
        if(e.target.value<0)
        setsick(0);
        else 
        setsick(e.target.value);
        
        }}/>
      </Grid >
     
      <Grid item md={3} xs={6}>
      <TextField  label="bereavement" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={bereavement}  onChange={(e)=>{
         if(e.target.value<0)
         setbereavement(0);
         else 
         setbereavement(e.target.value);
        }}/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="maternity" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={maternity}  onChange={(e)=>{
        if(e.target.value<0)
        setmaternity(0);
        else 
        setmaternity(e.target.value);
      }
        
        }/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="Othres" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={others}  onChange={(e)=>{
        if(e.target.value<0)
        setothers(0);
        else 
        setothers(e.target.value);
        }}/>
      </Grid >
    

      <Grid item md={6} xs={12} >
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
