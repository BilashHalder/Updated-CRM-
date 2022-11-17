import {React,useState,useEffect} from 'react'
import {Grid,Typography,TableContainer,Table,TableBody,TableRow,TableCell,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../util/lib';



export default function ViewEmployee(props) {
const {emp_id}=props;
const [emp_info, setEmp_info] = useState(null);
const [others_info, setothers_info] = useState(null);
useEffect(() => {
  axios({
    method: "get",
    url: `${baseUrl}/employee/${emp_id}`,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      setEmp_info(response.data)
    })
    .catch((err)=> {
     console.log(err);
    });

    axios({
      method: "get",
      url: `${baseUrl}/emp_info/user/${emp_id}`,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response)=> {
        setothers_info(response.data)
      })
      .catch((err)=> {
       console.log(err);
      });

}, [])


  return (
   <Grid container>
  {!emp_info?<CircularProgress color="inherit"/>:<Grid sx={{'mx':'2%','paddingTop':'3%'}} container>
   
   <Grid item md={6} sx={{'justifyContent':'center',"px":"2%"}}>
   <Typography variant="h5" component="h5" sx={{'textAlign':'center'}} >Personal Information </Typography>
   <TableContainer component={Paper} sx={{"marginTop":"2%"}}>
   <Table aria-label="customized table">
   <TableBody>
    <TableRow > <TableCell align="center" >Full Name </TableCell> <TableCell align="center" > {emp_info.name} [ {emp_info.id} ]</TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Email Id </TableCell> <TableCell align="center" > {emp_info.email}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Phone No </TableCell> <TableCell align="center" > {emp_info.phone}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" colSpan={2} ><img src={`${imageUrl}/${emp_info.image}`} height={200} width={200}/> </TableCell> </TableRow>
   </TableBody>
    </Table>
   </TableContainer>

   </Grid>
   <Grid item md={6} sx={{"justifyContent":"center"}}>
   <Typography variant="h5" component="h5" sx={{'textAlign':'center'}} >Others Information </Typography>
   <Grid sx={{"marginTop":"2%","px":"2%"}}>
   {!others_info?<Typography variant="p" component="p" sx={{'textAlign':'center'}} >No Information Available</Typography>:<Grid>
   <TableContainer component={Paper}>
   <Table aria-label="customized table">
   <TableBody>
    <TableRow > <TableCell align="center" >Date Of Birth </TableCell> <TableCell align="center" > {others_info.dob.slice(0,10)}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Joining Date </TableCell> <TableCell align="center" > {others_info.joining_date.slice(0,10)}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Report To </TableCell> <TableCell align="center" > {others_info.report_to}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Designation</TableCell> <TableCell align="center" > {others_info.designation_id}</TableCell> </TableRow>
   </TableBody>
    </Table>
   </TableContainer>
    
   <Button href={`/employee?id=${emp_id}`} sx={{"justifyContent":"center","m":"5%"}}>View More Information</Button>

    </Grid>}

   </Grid>
   
   </Grid>




    </Grid>
    }
   </Grid>
  )
}
