import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib';
export default function Kyc(props) {
    const { data}=props;
    const {fun}=data;

    const [message, setMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertColor, setaAertColor] = useState('error');



  //Form Data
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');
  const [address, setAddress] = useState('')
  const [user_id, setadhar_verified] = useState(data.user_id)
  const [user_type, setpan_verified] = useState(data.user_type)


  
  
  //Common Functions For All
   const snackClose=()=>{
    setAlertShow(false);
   } 
   const formHandler=(e)=>{
    e.preventDefault();
    let adharRegex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
    var panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if(panRegex.test(pan) == false){
      setAlertShow(true);
      setMessage('Invalid Pan Card No!');
      setaAertColor('error');
      }
    
   else if(adharRegex.test(adhar) == false){
    setAlertShow(true);
    setMessage('Invalid Adhar Card No Please Provide XXXX XXXX XXXX This Format!');
    setaAertColor('error');
    }

      else{
        let data = new FormData();
        data.append('user_id',user_id);
        data.append('user_type',user_type);
        data.append('adhar_no',adhar);
        data.append('pan_no',pan);
        data.append('address',address);


        let token=JSON.parse(localStorage.getItem('crzn')).token;
        const instance = axios.create({
          baseURL: 'http://localhost:9000/api/',
          headers: {
                      'Authorization': 'Bearer '+token,
                      "Content-Type": "multipart/form-data"
                   }
        });
        instance.post('kyc',data).then((response)=> {
          console.log(response.data)
            setAlertShow(true);
            setMessage("Your Kyc Verified Thank You!");
            setaAertColor('success');
            fun(Math.random())
            resetForm();
          })
          .catch((err)=> {
            console.log(err)
            setAlertShow(true);
            if(err.response.data.message){
              setMessage(err.response.data.message);
            }
            else 
            setMessage('Please Try Again Later!');
            setaAertColor('error');
      
          });





      }
  
  
   }
  
   const resetForm=()=>{
    setPan('');
    setAdhar('');
    setAddress('');

   }
  
  
  
    return (
        <Grid container >
          
     
       <Box component='form' onSubmit={formHandler} >
        
       <Grid container spacing={2} direction="row">
        
        <Grid item md={12} xs={12}>
        <Typography  sx={{padding:3,textAlign:'center'}}>Add Your Information</Typography>
        <TextField label="Pan Card Number"  type="text" required fullWidth  InputLabelProps={{ shrink: true}} value={pan}onChange={(e)=>{setPan(e.target.value)}}  />
        </Grid>
        <Grid item md={12} xs={12}>
        <TextField  label="Adhar Card Number" type="text"  required  fullWidth  InputLabelProps={{ shrink: true}} value={adhar}onChange={(e)=>{setAdhar(e.target.value)}} />
        </Grid >
        <Grid item md={12} xs={12}>
        <TextField  label="Address" type="text"  required  fullWidth  InputLabelProps={{ shrink: true}} value={address}onChange={(e)=>{setAddress(e.target.value)}} />
        </Grid >
        <Grid item md={12} xs={12} >
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


