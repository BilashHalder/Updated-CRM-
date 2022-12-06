
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


  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const user_id=info.id;
      setid(user_id);
      const fd=new FormData();
      fd.append('user_type',1);
      fd.append('user_id',user_id);
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
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
}
