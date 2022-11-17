import {React,useState,useEffect} from 'react'
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl} from '../../util/lib';

export default function EmployeeInfoNew(props) {
  //Common States For All
  const {emp_id}=props;
  const [message, setMessage] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState('error');

  //Intiated The Dropdwons
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [salarys, setSalarys] = useState([]);

  useEffect(() => {
    
    axios({
      method: "get",
      url: `${baseUrl}/employee`,
    })
      .then((response)=> {
        setEmployees(response.data);
        console.log(response.data);
      });

      axios({
        method: "get",
        url: `${baseUrl}/designation`,
      })
        .then((response)=> {
          setDesignations(response.data);
          console.log(response.data);
        })

        axios({
          method: "get",
          url: `${baseUrl}/salary`,
        })
          .then((response)=> {
            setSalarys(response.data);
            console.log(response.data);
          })


  }, [])
  


//From Input





//Common Functions For All
 const snackClose=()=>{
  setAlertShow(false);
 } 
 const formHandler=(e)=>{
  e.preventDefault();







 }

 const resetForm=()=>{
  console.log('reset');
  console.log(emp_id)
 }



  return (
      <Grid container sx={{'px':'5%','textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}} >
      <Typography align={'center'} variant={'h5'} sx={{'marginBottom':'5%'}}>Add Employee Information</Typography>
     <Box component='form' onSubmit={formHandler} >
     <Grid container spacing={2} direction="row">


     <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="designation">Designation</InputLabel>
        <Select label="Designation"  labelId="designation">
          {
            designations.length<1?<MenuItem >Please Add Designation</MenuItem>:
            designations.map((item)=>{
              return <MenuItem value={item.id}>{item.title}</MenuItem>
            })
          }
        
        </Select>
      </FormControl>
      </Grid >

      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="salary">Salary</InputLabel>
        <Select label="Salary"  labelId="Salary">
        {
            salarys.length<1?<MenuItem >Please Add Salary</MenuItem>:
            salarys.map((item)=>{
              return <MenuItem value={item.id}>{item.hra}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >

      <Grid item md={4} xs={12}>
      <FormControl fullWidth>
        <InputLabel id="report_to">Report To</InputLabel>
        <Select label="Report To"  labelId="report_to">
        <MenuItem value={0} >Admin</MenuItem>
        {
            employees.length<1?<></>:
            employees.map((item)=>{
              return <MenuItem value={item.id}> {item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      </Grid >
      
      <Grid item md={4} xs={12}>
      <TextField label="Joining Date"  type="date" required fullWidth  InputLabelProps={{ shrink: true}}  />
      </Grid>
    
      <Grid item md={4} xs={12}>
      <Button  variant="outlined"  component="label" sx={{'my':'2%'}}>
      Acceptance Letter
  <input type="file"  hidden  />
</Button>
      </Grid>

      <Grid item md={4} xs={12} >
      <Stack direction="row" spacing={4} sx={{'py':'3%','px':'4%'}}>
       
      <Button variant="outlined" type={'submit'} color="success">Save</Button>
      <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
     </Stack>
      </Grid>

      <Grid item md={6} xs={12} sx={{'justifyContent':'center'}} >
      <p>Salary Information</p>
      </Grid>

      <Grid item md={6} xs={12}sx={{'justifyContent':'center'}} >
      <p>Reporting Employee Details</p>
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
