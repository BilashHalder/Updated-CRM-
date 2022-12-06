import {React,useState,useEffect} from 'react'
import { Typography,Grid, Box,TextField,FormControl,Alert,Snackbar,InputLabel ,Select,MenuItem ,Button  ,Stack, Divider   } from '@mui/material';
import axios from 'axios';
export default function EmployeeInfo(props) {
  const [message, setMessage] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');


  const [allDesg, setallDesg] = useState([]);
  const [allSalary, setallSalary] = useState([]);
  const [allemp, setallemp] = useState([]);
  const [allLeave, setallLeave] = useState([]);


/////////////////////////////Form State....

const [desg, setdesg] = useState(0);
const [salid, setsalid] = useState(0);
const [empId, setempId] = useState(0);
const [leaveid, setleaveid] = useState(0);
const [dob, setdob] = useState('');
const [doj, setdoj] = useState('');




const formHandler=(e)=>{
  e.preventDeafult();


}


const handle=()=>{
  console.log('aaa')
}



  const snackClose=()=>{
    setAlertShow(false);
   } 

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
         instance.get('employee').then((res)=>setallemp(res.data)).catch((err)=>{console.log(err)});
         instance.get('designation').then((res)=>setallDesg(res.data)).catch((err)=>{console.log(err)});
         instance.get('salary').then((res)=>setallSalary(res.data)).catch((err)=>{console.log(err)});
         instance.get('leave').then((res)=>setallLeave(res.data)).catch((err)=>{console.log(err)});
    }
  }, []);


  return (
    
  <Box component={'form'} onSubmit={formHandler}>
    <Grid container spacing={2} direction="row">
      <Grid item md={12}>
      <Typography>Add Others Information</Typography>
      </Grid>
      <Grid item md={4} xs={12}>
   <TextField label="Employee Id"  type="number" required fullWidth disabled  InputLabelProps={{ shrink: true}} value={props.id}/>
   </Grid>

   <Grid item md={4} xs={12}>
   <FormControl fullWidth>
     <InputLabel id="desg">Designation</InputLabel>
     <Select label="Designation"  labelId="desg" value={desg} onChange={handle} >
      {
        allDesg.length==0?<>
         <MenuItem value={0}>Please Add Designation</MenuItem>
        </>:<>
        {
          allDesg.map((item)=>{
            return <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
          })
        }
        
        </>
      }
       
     </Select>
   </FormControl>
   </Grid >

   
   <Grid item md={4} xs={12}>
   <FormControl fullWidth>
     <InputLabel id="salary">Salary</InputLabel>
     <Select label="Salary"  labelId="salary" value={salid} onChange={(e)=>{setsalid(e.target.value)}} >
      {
        allDesg.length==0?<>
         <MenuItem value={0}>Please Add Salary</MenuItem>
        </>:<>
        {
          allSalary.map((item)=>{
            let {basic,hra,conveyance,special,medical,pf,insurance,tax}=item
            return <MenuItem key={item.id} value={item.id}>{(basic+hra+conveyance+special+medical)-(pf+insurance+tax)}</MenuItem>
          })
        }
        
        </>
      }
       
     </Select>
   </FormControl>
   </Grid >

   <Grid item md={4} xs={12}>
   <FormControl fullWidth>
     <InputLabel id="leave">Leave</InputLabel>
     <Select label="Leave"  labelId="leave" value={leaveid} onChange={(e)=>{setleaveid(e.target.value)}} >
      {
        allLeave.length==0?<>
         <MenuItem value={0}>Please Add Leave Information</MenuItem>
        </>:<>
        {
          allLeave.map((item)=>{
            const {annual, casual, sick, bereavement,maternity, others}=item
            return <MenuItem key={item.id} value={item.id}>{(annual+casual+sick+bereavement+maternity+others)}</MenuItem>
          })
        }
        
        </>
      }
       
     </Select>
   </FormControl>
   </Grid >

   <Grid item md={4} xs={12}>
   <FormControl fullWidth>
     <InputLabel id="report">Report To</InputLabel>
     <Select label="Report To"  labelId="report" onChange={(e)=>{console.log(e.target.value)}}  >
      {
        allemp.length==0?<>
         <MenuItem value={0}>Admin</MenuItem>
        </>:<>
        <MenuItem value={0}>Admin</MenuItem>
        {
          allemp.map((item)=>{
            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          })
        }
        
        </>
      }


    
       
     </Select>
   </FormControl>
   </Grid >

   <Grid item md={4} xs={12}>
   <TextField label="Date Of Birth"  type="date" required fullWidth InputLabelProps={{ shrink: true}}value={dob} onChange={(e)=>{setdob(e.target.value)}} />
   </Grid>

   <Grid item md={4} xs={12}>
   <TextField label="Joining Date"  type="date" required fullWidth InputLabelProps={{ shrink: true}} value={doj} onChange={(e)=>{setdoj(e.target.value)}}/>
   </Grid>
   <Grid item md={4} xs={12}>
      <Stack direction={'row'} spacing={3} sx={{marginTop:3}}>
        <Button variant='outlined' color='success' type={'submit'}>Save</Button>
        <Button variant='outlined' color='error'>Reset</Button>
      </Stack>
   </Grid>
   <Grid item md={4} xs={12}>
   <FormControl fullWidth>
     <InputLabel id="gender">Gender</InputLabel>
     <Select label="Gender"  labelId="gender"  onChange={(e)=>{
     console.log(e.target.value);
   }}>
       <MenuItem value={1}>Male</MenuItem>
       <MenuItem value={2}>Female</MenuItem>
       <MenuItem value={3}>Others</MenuItem>
     </Select>
   </FormControl>
   </Grid >
      <Grid>
      </Grid>
    </Grid>
    <Snackbar open={alertShow}
     autoHideDuration={2000} onClose={snackClose}>
   <Alert severity={alertColor}>{message}</Alert>
   </Snackbar>

  </Box>
  )
}
