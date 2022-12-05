import {React,useState,useEffect} from 'react'
import {Grid,Typography,Box,Button,FormGroup,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';


export default function InvesmentEdit(props) {
  const {id,user_id,user_type,nominee_id,account_no,payment_id,date_time, agreement_file,withdrw_req_time}=props.data;
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

  //From Data

  const [nominee, setNominee] = useState([]);
  const [accounts, setAccounts] = useState([]);



  const [snominee, setSnominee] = useState(parseInt(nominee_id));
  const [account, setAccount] = useState(parseInt(account_no));
  const [amount, setAmount] = useState(props.data.ammount)
  const [roi, setroi] = useState(props.data.roi);
  const [is_send, setIs_send] = useState(props.data.is_send);
  const [status, setStatus] = useState(props.data.status);
  const [sagreement_file, setAgreement_file] = useState(null)
  

  useEffect(() => {
    if (localStorage) {
        let info=JSON.parse(localStorage.getItem('crzn'));
        let token=info.token;
        let data = new FormData();
         data.append('user_id',user_id);
         data.append('user_type',user_type);
         const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
          instance.post('nominee/user',data).then((response)=> {
            setNominee(response.data);
          }).catch((err)=>{
            console.log(err)
          });
          instance.post('account/user',data).then((response)=> {
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
    setMessage('Please Select Nominee!');
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
  data.append('status',status);
  if(sagreement_file)
  data.append('agreement_file',sagreement_file);

  let token=JSON.parse(localStorage.getItem('crzn')).token;
  const instance = axios.create({
     baseURL: 'http://localhost:9000/api/',
     headers: {
                 'Authorization': 'Bearer '+token,
                 "Content-Type": "multipart/form-data"
              }
   });

instance.put(`invesment/${props.data.id}`,data)
    .then((response)=> {
      console.log(response)
      setAlertShow(true);
      setMessage("Invesment Information Updated!");
      props.fun(Math.random())
      setaAertColor('success');
      resetForm();
    })
    .catch((err)=> {
      setAlertShow(true);
      console.log(err)
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
  setAmount('');
  setIs_send(false);
 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Edit Invesment Information</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={4} xs={12}>
      <TextField label="Ammount"  type="number" required fullWidth  InputLabelProps={{ shrink: true}}  onChange={(e)=>{setAmount(e.target.value)}} value={amount} />
      </Grid>

      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="nominee">Nominee</InputLabel>
        <Select label="Nominee"  labelId="nominee" value={snominee} onChange={(e)=>{setSnominee(e.target.value)}}>
          {
            nominee.length<1?<MenuItem >Please Add Nominee</MenuItem>:
            nominee.map((item)=>{
              return <MenuItem key={item.id} value={parseInt(item.id)}>{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >



      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="nominee">Bank Account</InputLabel>
        <Select label="Nominee"  labelId="nominee"  value={account} onChange={(e)=>{setAccount(e.target.value)}}>
        {
            accounts.length<1?<MenuItem >Please Add Bank Account</MenuItem>:
            accounts.map((item)=>{
              return <MenuItem value={parseInt(item.account_no)}>{item.account_no}  [ {item.bank} ]</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >


      <Grid item md={4} xs={12}>
      <TextField label="ROI"  type="text"  value={roi} fullWidth  InputLabelProps={{ shrink: true}} onChange={(e)=>{setroi(e.target.value)}}  />
      </Grid>

      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="nominee">Status</InputLabel>
        <Select label="Nominee"  labelId="nominee" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
        <MenuItem  value={0}>Pending</MenuItem>
        <MenuItem  value={1}>Active</MenuItem>
        <MenuItem  value={2}>Withdraw</MenuItem>
        <MenuItem  value={3}>Close</MenuItem>
        </Select>
      </FormControl>
      </Grid >
      
      <Grid item md={4} xs={12}>{
       agreement_file?<Button href={`http://localhost:9000/uploads/documents/${agreement_file}`} target={'_blank'}>View Agreement</Button>:<>
       <Button
  variant="outlined"
  component="label"
>
  Upload Agreement File
  <input onChange={(e)=>{
        setAgreement_file(e.target.files[0]);
      }}
    type="file"
    hidden
    accept="application/pdf"
  />
</Button>
       </>
      }
      <FormGroup>
      
    </FormGroup>
      </Grid>

      <Grid item md={4} xs={12}>
      <FormGroup>
      <FormControlLabel control={<Switch  checked={is_send}  onChange={(e)=>{setIs_send(!is_send)}}/>} label="Send Invesment Paper By Post" />
    </FormGroup>
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
