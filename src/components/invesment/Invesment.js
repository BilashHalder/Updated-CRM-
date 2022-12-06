import {React,useState,useEffect} from 'react'
import {Grid,Box,Button,Typography,FormGroup,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,Item} from '../../util/lib';

export default function Invesment(props) {
  const {user_id,user_type,fun}=props;
  //Common States For All
  const [message, setMessage] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

  //From Data

  const [nominee, setNominee] = useState([]);
  const [accounts, setAccounts] = useState([]);



  const [snominee, setSnominee] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState()
  const [roi, setroi] = useState(3);
  const [is_send, setIs_send] = useState(false);


  useEffect(() => {
    if (localStorage) {
      let data = new FormData();
      data.append('user_id',user_id);
      data.append('user_type',user_type);
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      instance.post('nominee/user',data)
      .then((response)=> {
        setNominee(response.data);
      }).catch((err)=>{
        console.log(err)
      });

      instance.post('account/user',data)
        .then((response)=> {
          setAccounts(response.data);
        }).catch((err)=>{
          console.log(err)
        });


    }
   

  }, [])
  

//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  if(!snominee){
    setAlertShow(true);
    setMessage('Please Select Your Nominee!');
    setaAertColor('error');
  }
  else if(!account){
    setAlertShow(true);
    setMessage('Please Select Bank Account!');
    setaAertColor('error');
  }

  else if(!amount || parseFloat(amount)<1000){
    setAlertShow(true);
    setMessage('Minimum Invesment Require 1000 INR.');
    setaAertColor('error');
  }

  else{
    let data = new FormData();
  data.append('user_id',user_id);
  data.append('user_type',user_type);
  data.append('ammount',amount);
  data.append('roi',roi);
  data.append('nominee_id',snominee);
  data.append('account_no',account);
  data.append('is_send',is_send?1:0);
  
  let info=JSON.parse(localStorage.getItem('crzn'));
  let token=info.token;

  const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    headers: {
                'Authorization': 'Bearer '+token,
                "Content-Type": "multipart/form-data"
             }
  });
  instance.post('invesment',data)
    .then((response)=> {
      setAlertShow(true);
      setMessage("Invesment Successfull Please Wait for Verification!");
      setaAertColor('success');
      fun(Math.random());
      resetForm();
    })
    .catch((err)=> {
      setAlertShow(true);
      console.log(err.response.data.message)
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
  setSnominee('');
  setAccount('');
  setAmount(0);
  setIs_send(false);
 }



  return (
      <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
     <Item sx={{'px':'5%',}}>
      <Typography variant='p' sx={{paddingTop:3,fontWeight:500}} component='p'>Please Add Following Information</Typography>
      <Divider/>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={6} xs={12}>
      <TextField label="Ammount"  type="number" required fullWidth  InputLabelProps={{ shrink: true}} value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
      </Grid>

      <Grid item md={6} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="nominee">Nominee</InputLabel>
        <Select label="Nominee"  labelId="nominee" value={snominee} onChange={(e)=>{setSnominee(e.target.value)}}>
          {
            nominee.length<1?<MenuItem >Please Add Nominee</MenuItem>:
            nominee.map((item)=>{
              return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >

      <Grid item md={6} xs={12} sx={{marginTop:5}}>
      <FormControl fullWidth>
        <InputLabel id="nominee">Bank Account</InputLabel>
        <Select label="Nominee"  labelId="nominee"  value={account} onChange={(e)=>{setAccount(e.target.value)}}>
        {
            accounts.length<1?<MenuItem >Please Add Bank Account</MenuItem>:
            accounts.map((item)=>{
              return <MenuItem value={item.account_no}>{item.account_no}  [ {item.bank} ]</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >
      <Grid item md={6} xs={12}  sx={{marginTop:5}}>
      <TextField label="ROI"  type="text"  value={roi+' % '} fullWidth  InputLabelProps={{ shrink: true}}  disabled  />
      </Grid>
      <Grid item md={6} xs={12}  sx={{marginTop:5}}>
      <FormGroup>
      <FormControlLabel control={<Switch  checked={is_send}   onChange={(e)=>{setIs_send(!is_send)}}/>} label="Send Invesment Paper By Post" />
    </FormGroup>
      </Grid>

      <Grid item md={6} xs={12}  sx={{marginTop:5}} >
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
     </Item>

    </Grid>
  )
}
