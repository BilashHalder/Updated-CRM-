import {React,useState,useEffect} from 'react'
import {Grid,Typography,TableContainer,Table,TableBody,TableRow,TableCell,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import {baseUrl,docUrl} from '../../util/lib';

export default function ViewQualification(props) {
  console.log(props.data)
  let others_info=undefined;
  const{id,degree_name,year_of_pass,degree_from,marks,document_url,employee_id}=props.data;
  return (
    <Grid container>
 <Grid sx={{'mx':'2%','paddingTop':'3%'}} container>
   
   <Grid item md={6} sx={{'justifyContent':'center',"px":"2%"}}>
   <Typography variant="h5" component="h5" sx={{'textAlign':'center'}} >Qualification Details </Typography>
   <Divider/>
   <TableContainer component={Paper} sx={{"m":"5%"}}>
   <Table aria-label="customized table">
   <TableBody>
    <TableRow > <TableCell align="center" >Degree Name </TableCell> <TableCell align="center" > {degree_name} [{year_of_pass}] </TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Degree From </TableCell> <TableCell align="center" > {degree_from}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" >Marks </TableCell> <TableCell align="center" > {marks}</TableCell> </TableRow>
    <TableRow > <TableCell align="center" colSpan={2} ><a href={`${docUrl}/${document_url}`} target={'_blank'}>View Document</a> </TableCell> </TableRow>
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
    
   </Grid>
  )
}
