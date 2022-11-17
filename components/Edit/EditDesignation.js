import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib'

export default function EditDesignation(props) {
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');




//Form Data 

const [title, setTitle] = useState(props.data.title);
const [id, setId] = useState(props.data.id);


//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{

  e.preventDefault();
  if(title.length<5){
    setAlertShow(true);
    setMessage('Please Enter a Valid Title!');
    setaAertColor('error');
  }
  else{
   let data = new FormData();
  data.append('title',title);
  axios({
    method: "put",
    url: `${baseUrl}/designation/${id}`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      
      setAlertShow(true);
      setMessage("Data Updated Successfully");
      setaAertColor('success');
      props.fun(Math.random());
      resetForm();
    })
    .catch((err)=> {
      setAlertShow(true);
      setMessage('Please Try Again Later!');
      setaAertColor('error');

    });

  }


 }

 const resetForm=()=>{
  setTitle('')

 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Edit Designation Information</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={6} xs={12}>
      <TextField label=" Designation Title"  type="text" required fullWidth  InputLabelProps={{ shrink: true}}  value={title} onChange={(e)=>{
        setTitle(e.target.value);
      }}/>
      </Grid>
      <Grid item md={6} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'2%','px':'4%'}}>
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
