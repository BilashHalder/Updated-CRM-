import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib'



export default function AccountNew(props) {

  const {user_id,user_type}=props;
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');


//Form States 


const [account, setAccount] = useState('');
const [caccount, setCAccount] = useState('');
const [ifsc, setIfsc] = useState('');
const [bank, setBank] = useState('');
const [branch, setBranch] = useState('');
const [verify, setVerify] = useState(true);

const formHandler=(e)=>{
  e.preventDefault();
  let data = new FormData();
  data.append('user_id',user_id);
  data.append('user_type',user_type);
  data.append('account_no',account);
  data.append('ifsc_code',ifsc);
  data.append('bank',bank);
  axios({
    method: "post",
    url: `${baseUrl}/account`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then( (response)=> {
      console.log(response)
      setAlertShow(true);
      setMessage(response.data.message);
      setaAertColor('success');
      resetForm();
    })
    .catch( (error)=> {
      console.log(error)
      setAlertShow(true);
      setMessage('Please Try Again Later!');
      setaAertColor('error');
    });
}

//Common Functions For All
 const snackClose=()=>{ setAlertShow(false);} 
 const verifyHandler=(e)=>{

if(account.toString().length< 10 || (Number.isNaN(account))){
  setAlertShow(true);
  setMessage('Please Enter Correct Account No');
  setaAertColor('error');
}

else if(account!=caccount){
  setAlertShow(true);
  setMessage('Confirm Bank Account Does Not Match');
  setaAertColor('error');
}

else{
  
  axios.get(`https://ifsc.razorpay.com/${ifsc}`).then(function (response) {
    setBank(response.data.BANK);
    setBranch(response.data.BRANCH);
    setVerify(false);
  })
  .catch(function (error) {
    setAlertShow(true);
    console.log(error)
    setMessage('Invalid IFSC Code!');
    setaAertColor('error');
    setBank('');
    setBranch('');
   
  });
}
 }

 const resetForm=()=>{
  setAccount('');
  setCAccount('');
  setIfsc('');
  setBank('');
  setIfsc('');
  setBranch('');
  setVerify(true)
 }

  return (

      <Grid container sx={{'px':'3%','textAlign':'center!important','justifyContent':'center','my':'2%','fontFamily':'Playfair Display!important'}} >
     
     <Box component='div' sx={{'width':'100%'}}>
     <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add New Bank Account</Typography>
     </Box>

     <Box component='form' onSubmit={formHandler} >

     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label=" Bank Account Number"  type="text" value={account} required fullWidth  InputLabelProps={{ shrink: true}}  onChange={(e)=>{ setAccount((e.target.value)); setVerify(true);}} />
      </Grid>

      <Grid item md={4} xs={12}>
      <TextField label="Confirm Bank Account Number"  type="password" value={caccount} required fullWidth  InputLabelProps={{ shrink: true}}  onChange={(e)=>{ setCAccount(e.target.value); setVerify(true)}} />
      </Grid>

      <Grid item md={4} xs={12}>
      <TextField  label="IFSC Code" type="text"  value={ifsc} required  fullWidth  InputLabelProps={{ shrink: true}}  onChange={(e)=>{ setIfsc(e.target.value); setVerify(true)}}/>
      </Grid >
      <Grid item md={4} xs={12}>
      <TextField  label="Bank Name" type="text"  value={bank}  required disabled  fullWidth  InputLabelProps={{ shrink: true}}/>
      </Grid >
      <Grid item md={4} xs={12}>
      <TextField  label="Branch Name" type="text"  value={branch}  required disabled  fullWidth  InputLabelProps={{ shrink: true}}/>
      </Grid >

      <Grid item md={4} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
        {
          verify?<Button variant="outlined" onClick={verifyHandler} color="success">Veify</Button>:<Button variant="outlined" type={'submit'} color="success">Save</Button>
        }
      
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
