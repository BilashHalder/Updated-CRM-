<<<<<<< HEAD
import { Grid } from '@mui/material'
import {React,useState,useEffect} from 'react'
import axios from 'axios';
import KycView from 'src/components/kyc/KycView';
import Kyc from 'src/components/kyc/Kyc';
import { Item } from "src/util/lib";
import CustomerCard from 'src/components/customer/CustomerCard';
import WithdrawalCard from 'src/components/others/WithdrawalCard';
export default function profile() {
const [kycinfo, setkycinfo] = useState(null);
const [id, setid] = useState(null);
const [flag, setflag] = useState(0);

const [userInfo, setuserInfo] = useState(null)

=======

import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box,Grid} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import KycView from "src/components/kyc/KycView";
import Kyc from "src/components/kyc/Kyc";
import CustomerCard from "src/components/customer/CustomerCard";


export default function profile() {
  const [flag, setFlag] = useState(0);
  const [id, setid] = useState(null);
  const [kyc, setkyc] = useState(null);
>>>>>>> 53b33bfdeffccecc00f9470431d049502329ea64


  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const user_id=info.id;
<<<<<<< HEAD
      const fd=new FormData();
      setid(user_id);
=======
      setid(user_id);
      const fd=new FormData();
>>>>>>> 53b33bfdeffccecc00f9470431d049502329ea64
      fd.append('user_type',1);
      fd.append('user_id',user_id);
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
<<<<<<< HEAD
         instance.post('kyc/user',fd).then((res)=>{if(res.data.adhar_no)setkycinfo(res.data)
         else setkycinfo(null)}).catch((err)=>{console.log(err)});

         instance.get(`customer/${user_id}`).then((response)=>{setuserInfo(response)}).catch(console.log)
    }

  }, [flag])
  
  return (
<Item>
<Grid container>
<Grid md={12} sm={12}>
{userInfo?<CustomerCard data={userInfo}/>:<></>}
</Grid>

<Grid md={7} sm={12} sx={{padding:'4%'}}>
{kycinfo?<KycView data={kycinfo}/>:<>
{
  id?<Kyc data={{user_id:id,user_type:1,fun:setflag}}/>:<>Please Try Again Later</>
}
</>}
</Grid>

<Grid md={5} sm={12} sx={{padding:'4%'}}>
  {
    id?<WithdrawalCard data={{user_id:id,user_type:1}}/>:<></>
  }

</Grid>



</Grid>
</Item>
  )
=======
         instance.post('kyc/user',fd).then((res)=>setkyc(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag]);



  return (

    <Item>
    <Box sx={{ width: "100%" }}>
     
      <Grid container>

        <Grid item md={12}>
        {
      kyc?<><KycView data={kyc}/></>:<></>
       }
       {
        id && kyc==null?<><Kyc user_id={id} user_type={1} fun={setFlag}/></>:<></>
       }
        </Grid>
      </Grid>
     <Grid item md={12} sx={{marginTop:5}}>
      {
      id? <CustomerCard id={id}/>:<></>
       }
     </Grid>
    </Box>

    </Item>

  );
>>>>>>> 53b33bfdeffccecc00f9470431d049502329ea64
}
