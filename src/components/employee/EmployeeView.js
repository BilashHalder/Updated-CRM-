import {React,useState,useEffect} from 'react'
import { Grid ,Table,TableCell,TableRow,Typography} from "@mui/material";
import {connection} from 'src/util/lib'
export default function EmployeeView(props) {


 const {id,name,gender,email,phone,balance,status}=props.data;



 useEffect(() => {
  if (localStorage) {
    let info=JSON.parse(localStorage.getItem('crzn'));
    let token=info.token;
    const instance = connection(token);
       instance.get(`salary`).then((res)=>console.log(res.data)).catch((err)=>{console.log(err)});
  }
}, []);






  return (
    <Grid>
     <Typography sx={{textAlign:'center',fontWeight:600}} variant={"p"} component={'p'} >Basic Information</Typography> 
      <Table>
        <TableRow>
          <TableCell sx={{fontWeight:500}}>Name</TableCell>
          <TableCell>{name} {`[${id}]`}</TableCell>
          <TableCell sx={{fontWeight:500}}>Email</TableCell>
          <TableCell>{email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:500}}>Phone</TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell sx={{fontWeight:500}}>Gender</TableCell>
          <TableCell>{gender==0?"Male":gender==1?"Female":"Others"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{fontWeight:500}}>Balance</TableCell>
          <TableCell>{balance}</TableCell>
          <TableCell sx={{fontWeight:500}}>Status</TableCell>
          <TableCell>{status==0?"De-Active":"Active"}</TableCell>
        </TableRow>
      </Table>
    </Grid>
  )
}
