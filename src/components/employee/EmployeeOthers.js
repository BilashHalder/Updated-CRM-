import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { Typography,Grid, Box,TextField,FormControl,InputLabel ,Select,MenuItem ,Button  ,Stack, Divider   } from '@mui/material';
import {Item} from 'src/util/lib'
import EmployeeInfoEdit from './EmployeeInfoEdit';
import EmployeeInfo from './EmployeeInfo';
import Qualifications from '../qualification/Qualifications';
import Qualification from '../qualification/Qualification';
import KycView from '../kyc/KycView';
import KycEdit from '../kyc/KycEdit';
import Kyc from '../kyc/Kyc';



export default function EmployeeOthers(props) {

    const [info, setinfo] = useState(null);
    const [allquf, setallquf] = useState([]);
    const [kyc, setkyc] = useState(null);

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let data=new FormData();
      data.append('user_type',3);
      data.append('user_id',props.id);
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      instance.get(`emp_info/${props.id}`).then((res)=>setinfo(res.data)).catch((err)=>{console.log(err)});
      instance.get(`qualification/all/${props.id}`).then((res)=>setallquf(res.data)).catch((err)=>{console.log(err)});
      instance.post(`kyc/user`,data).then((res)=>setkyc(res.data)).catch((err)=>{console.log(err)});

    }
   
  }, []);


  
  return (
  <Item>
     <Grid container>
    <Grid item md={12}>

{
  info?<><EmployeeInfoEdit data={info}/></>:<><EmployeeInfo id={props.id}/></>
}

    <Divider/>
      <Typography variant='h6' sx={{fontWeight:600}}>Employee Qualification Information</Typography>
      <Divider/>
      {
        allquf.length?  <Qualifications data={allquf}/>:<>No Qualification Added Yet</>
      }
    
      <Qualification emp_id={props.id}/>
      <Divider/>
      {
        kyc?<><KycEdit data={kyc}/></>:<><Kyc user_id={props.id} user_type={3}/></>
      }

    </Grid>
   </Grid>
  </Item>
  )
}
