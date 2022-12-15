import {React,useState,useEffect} from 'react'
import { Grid ,Typography} from "@mui/material";
export default function EmployeeView(props) {

 const {id,name,gender,email,phone,balance,status}=props.data;
 console.log(props.data)
  return (
    <Grid>
     <Typography sx={{textAlign:'center',fontWeight:600}} variant={"p"} component={'p'} >Basic Information</Typography> 
    </Grid>
  )
}
