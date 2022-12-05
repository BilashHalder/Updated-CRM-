import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Grid, Typography,Box} from '@mui/material'
import Kyc from './Kyc';
import BankAccountNew from './BankAccountNew';
import BankAccounts from './BankAccounts';
import KycCard from './KycCard';


export default function EmployeeOthers() {
    const [id, setId] = useState(null);
    const [flag, setflag] = useState(0);
    const [account, setAccount] = useState([]);
    const [kyc, setKyc] = useState(null);

    useEffect(() => {
        if (localStorage) {
          let info=JSON.parse(localStorage.getItem('crzn'));
          let token=info.token;
          let id=info.id;
          setId(id);
          let data=new FormData();
          data.append('user_id',id);
          data.append('user_type',3);
    
    
    
          const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
      
          instance.post('kyc/user',data).then((res)=>setKyc(res.data)).catch((err)=>{console.log(err.response.data)});
          instance.post('account/user',data).then((res)=>setAccount(res.data)).catch((err)=>{console.log(err.response.data)});
      //     let data=new FormData();
      // data.append('basic',1000);data.append('hra',1000);data.append('conveyance',1000);data.append('medical',1000);
      // data.append('special',1000);data.append('pf',1000);data.append('insurance',1000);data.append('tax',1000);
     // instance.post('nominee/user',data).then((res)=>setNominees(res.data)).catch((err)=>{console.log(err.response.data)});
        // instance.get('customer').then((res)=>console.log(res.data)).catch((err)=>{console.log(err)});
        // instance.get('customer').then((res)=>console.log(res.data)).catch((err)=>{console.log(err)});
        }
       
      }, [flag])
  return (
   <Grid container>
{
    kyc?<><KycCard data={kyc}/></>:<><Kyc user_id={id} user_type={3} fun={setflag}/></>
}
<Grid item md={12} >
{
    account?<>
    <Typography sx={{textAlign:'center'}} variant={'h6'} component={'h6'} >Bank Account Information</Typography>

   
    <BankAccounts data={account}/></>:<>{id?<BankAccountNew user_id={id?id:null} user_type={3} fun={setflag}/>:<></>}</>
}
</Grid>
   </Grid>
  )
}
