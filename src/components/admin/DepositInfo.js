import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer,Table,TableBody,TableCell,TableContainer,Chip,TableRow} from '@mui/material';
import axios from 'axios';


export default function DepositInfo(props) {
  const {data,fun}=props;
    //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');
  const [off, setOff] = useState(false);
  const [tid, settid] = useState('')
  const [ttype, setttype] = useState(1)
  const [amount, setAmount] = useState();
  const [img, setImg] = useState(null)
//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  if(!amount || amount<1){
      setAlertShow(true);
      setMessage("Please Enter The Ammount");
      setaAertColor('error');
  }

  else if(ttype==1 && !img){
    setAlertShow(true);
    setMessage("Please Upload Transaction Receipt");
    setaAertColor('error');

  }

  else if(ttype!=1 && !tid){
    setAlertShow(true);
    setMessage("Please Enter The Transaction Id");
    setaAertColor('error');
  }
else{

  let data = new FormData();
  data.append('user_id',user_id);
  data.append('user_type',user_type);
  data.append('amount',amount);
  data.append('mode',ttype);
  if(ttype==1)
  {
    data.append('doc',img);
    data.append('reference',Math.floor(Date.now() / 1000)); 
  }
  else{
    data.append('reference',tid); 
  }

  axios({
    method: "post",
    url: `${baseUrl}/deposit`,
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      setAlertShow(true);
      setMessage("Transaction Request Saved");
      setaAertColor('success');
      fun();
      resetForm();
    })
    .catch((response)=> {
      setaAertColor('error');
      setAlertShow(true);
      if(response.response.data.message)
      setMessage(response.response.data.message);
      else
      setMessage('Please Try Again Later!');
    
    });
}









 }
 const resetForm=()=>{
 settid();
 setAmount(0);
 setttype(1);
 setImg('');
 }
 ////``, ``, ``, `doc`, ``, `remarks`, ``, ``, ``, ``

  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Deposit Information</Typography>
      <Box>
      <TableContainer component={Paper}>
    <Table >
      <TableBody>
          <TableRow  >
            <TableCell component="th" scope="row" sx={{fontWeight:900}}>  Deposit Id </TableCell>
            <TableCell align="left"  scope="row">{data.id} </TableCell>
            <TableCell component="th" scope="row"  sx={{fontWeight:900}}>  Deposit Date & Time </TableCell>
            <TableCell align="left"  scope="row">{data.date_time.replace('T',' ').replace('.000Z','')} </TableCell>
            <TableCell component="th" scope="row" sx={{fontWeight:900}}> User Type  </TableCell>
            <TableCell align="left"  scope="row"><Chip label={data.user_type==1?"Customer":data.mode==2?"Associate":"Employee"}></Chip></TableCell>
          </TableRow>
          <TableRow  >
          <TableCell component="th" scope="row" sx={{fontWeight:900}}> Amount  </TableCell>
            <TableCell align="left"  scope="row">{data.amount}</TableCell>
            <TableCell component="th" scope="row" sx={{fontWeight:900}}> Transaction Mode  </TableCell>
            <TableCell align="left"  scope="row"><Chip label={data.mode==1?"Bank Deposit":data.mode==2?"Upi/IMPS":"Others"}></Chip></TableCell>
            <TableCell component="th" scope="row" sx={{fontWeight:900}}> User Id  </TableCell>
            <TableCell align="left"  scope="row">{data.user_id}</TableCell>
          </TableRow>
          <TableRow  >
          <TableCell component="th" scope="row" sx={{fontWeight:900}}> Status  </TableCell>
            <TableCell align="left"  scope="row"><Chip label={data.status==0?"Pending":data.status==1?"Success":"Rejected"} color={data.status==0?"info":data.status==1?"success":"error"}></Chip></TableCell>
            {
              data.doc?<TableCell component="th" scope="row" sx={{fontWeight:900}}> <Button href={`http://localhost:9000/uploads/images/${data.doc}`} target="_blank">View Payment Slip</Button> </TableCell> :<>
              <TableCell component="th" scope="row" sx={{fontWeight:900}}>Transaction Id </TableCell>
               <TableCell align="left"  scope="row">{data.reference}</TableCell>
              </>
            }
            
          </TableRow>
          {
            data.status==0?<TableRow>
            <TableCell align="center"  scope="row">
              <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="success">Accept</Button>
              <Button variant="outlined" color="error">Reject</Button>
              </Stack>
  
            </TableCell>
            </TableRow>:<></>
          }


      </TableBody>
    </Table>
  </TableContainer>
      </Box>






      <Snackbar open={alertShow}
        autoHideDuration={2000} onClose={snackClose}>
      <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>

    </Grid>
  )
}

