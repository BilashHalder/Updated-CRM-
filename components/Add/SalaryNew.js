import {React,useState} from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar,List,ListItem,ListItemText,Divider  } from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib'


export default function SalaryNew() {
  //Common States For All
  const [message, setMessage] = useState('This is a success alert — check it out!');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

//Form Inputs
const [basic, setBasic] = useState('');
const [hra, setHra] = useState('');
const [conveyance, setConveyance] = useState('');
const [medical, setMedical] = useState('');
const [special, setSpecial] = useState('');
const [pf, setPf] = useState('');
const [insurance, setInsurance] = useState('');
const [tax, setTax] = useState('');
const [cost, setCost] = useState(0);
const [deduct, setDeduct] = useState(0);
const [total, setTotal] = useState(0)


const calculate=()=>{
  let cost=parseFloat((basic?basic:0)) + parseFloat((hra?hra:0))+parseFloat((conveyance?conveyance:0)) + parseFloat((special?special:0))+ parseFloat((medical?medical:0));
  let deduct=parseFloat((insurance?insurance:0)) + parseFloat((tax?tax:0)) +parseFloat((pf?pf:0))
  setCost(cost);
  setDeduct(deduct);
  setTotal(cost+deduct);

}


//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();
  if(!basic || !hra || !conveyance || !medical || !special || !pf || !insurance || !tax){
    setAlertShow(true);
    setMessage('Please Enter Valid Salary Information!');
    setaAertColor('error');
  }
  else{
    let data = new FormData();
    data.append('basic',basic);
    data.append('hra',hra);
    data.append('conveyance',conveyance);
    data.append('medical',medical);
    data.append('special',special);
    data.append('pf',pf);
    data.append('insurance',insurance);
    data.append('tax',tax);
    axios({
      method: "post",
      url: `${baseUrl}/salary`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response)=> {
        setAlertShow(true);
        setMessage("Salary Information Saved");
        setaAertColor('success');
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
  setBasic('');
  setHra('');
  setConveyance('');
  setMedical('');
  setSpecial('');
  setPf('');
  setInsurance('');
  setTax('');
  setCost(0);
  setDeduct(0);
  setTotal(0);

 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add New Salary Information</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">
      <Grid item md={3} xs={6}>
      <TextField label="Basic"  type="number" required fullWidth  InputLabelProps={{ shrink: true}}  value={basic}  onChange={(e)=>{
        if(e.target.value<0)
        setBasic(0);
        else setBasic(e.target.value);
        }}/>
      </Grid>
      <Grid item md={3} xs={6}>
      <TextField  label="HRA" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={hra}  onChange={(e)=>{
        if(e.target.value<0)
        setHra(0);
        else 
        setHra(e.target.value);
      }}/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="Conveyance	" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={conveyance}  onChange={(e)=>{
        if(e.target.value<0)
        setConveyance(0);
        else 
        setConveyance(e.target.value);
        
        }}/>
      </Grid >
     
      <Grid item md={3} xs={6}>
      <TextField  label="Special" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={special}  onChange={(e)=>{
         if(e.target.value<0)
         setSpecial(0);
         else 
         setSpecial(e.target.value);
        }}/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="Medical" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={medical}  onChange={(e)=>{
        if(e.target.value<0)
        setMedical(0);
        else 
        setMedical(e.target.value);
      }
        
        }/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="Provident Fund" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={pf}  onChange={(e)=>{
        if(e.target.value<0)
        setPf(0);
        else 
        setPf(e.target.value);
        }}/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="Insurance" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={insurance}  onChange={(e)=>{
          if(e.target.value<0)
          setInsurance(0);
          else 
          setInsurance(e.target.value);
        }}/>
      </Grid >
      <Grid item md={3} xs={6}>
      <TextField  label="Tax" type="number"  required  fullWidth  InputLabelProps={{ shrink: true}} value={tax}  onChange={(e)=>{
       if(e.target.value<0)
       setTax(0);
       else 
       setTax(e.target.value);
      }
        
        }/>
      </Grid >
      <Grid item md={6} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
      <Button variant="outlined" type={'submit'} color="success">Save</Button>
      <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
      <Button variant="outlined" color="info" onClick={calculate}>View Details</Button>
     </Stack>
      </Grid>
      <Grid item md={3} xs={6}>
        <List>
          {
            basic? <><ListItem><ListItemText>Basic  ₹ {basic} </ListItemText> </ListItem> <Divider/></>:<></>
          } 
           {
            hra? <><ListItem><ListItemText>HRA  ₹ {hra} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            conveyance? <><ListItem><ListItemText>Conveyance  ₹ {conveyance} </ListItemText> </ListItem> <Divider/></>:<></>
          }
        
           {
            special? <><ListItem><ListItemText>Special  ₹ {special} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            total? <><ListItem><ListItemText>CTC Per Month   </ListItemText> </ListItem> <Divider/></>:<></>
          }
          {
            deduct? <><ListItem><ListItemText>Insurance +  PF +  Tax   </ListItemText> </ListItem> <Divider/></>:<></>
          }  

          {
            deduct? <><ListItem><ListItemText>Total Salary   </ListItemText> </ListItem> <Divider/></>:<></>
          } 

          </List>

      </Grid >
      <Grid item md={3} xs={6}>
        <List>
        
           {
            medical? <><ListItem><ListItemText>Medical  ₹ {medical} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            pf? <><ListItem><ListItemText>PF  ₹ {pf} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            insurance? <><ListItem><ListItemText>Insurance  ₹ {insurance} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            tax? <><ListItem><ListItemText>Tax  ₹ {tax} </ListItemText> </ListItem> <Divider/></>:<></>
          }

        {
            total? <><ListItem><ListItemText>  ₹ {total} </ListItemText> </ListItem> <Divider/></>:<></>
          }
          {
            deduct? <><ListItem><ListItemText>  ₹ {deduct} </ListItemText> </ListItem> <Divider/></>:<></>
          }  

          {
            deduct? <><ListItem><ListItemText>  ₹ {total-deduct} </ListItemText> </ListItem> <Divider/></>:<></>
          } 

          </List>

      </Grid >

    </Grid>
     </Box>

      <Snackbar open={alertShow}
        autoHideDuration={2000} onClose={snackClose}>
      <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>

    </Grid>
  )
}
