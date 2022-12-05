import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { Typography,Grid, Box,TextField,FormControl,InputLabel ,Select,MenuItem ,Button  ,Stack   } from '@mui/material';



export default function EmployeeOthers(id) {

    
  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let id=info.id;
      let data=new FormData();
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      instance.get(`emp_info/${props.data.id}`).then((res)=>setOthers(res.data)).catch((err)=>{console.log(err)});
    }
   
  }, []);


  
  return (
    <div>EmployeeOthers</div>
  )
}
