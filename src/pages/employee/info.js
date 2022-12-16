import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Qualification from "src/components/qualification/Qualification";
import Qualifications from "src/components/qualification/Qualifications";
import KycView from "src/components/kyc/KycView";
import Kyc from "src/components/kyc/Kyc";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export default function info() {
  const [tab, setTab] = useState(0);
  const [flag, setFlag] = useState(0);
  const [qualifictions, setqualifictions] = useState([]);
  const [kycinfo, setkycinfo] = useState(null);
  const [otherinfo, setotherinfo] = useState(null);


const [id, setid] = useState(null);
useEffect(() => {
  if (localStorage) {
    let info=JSON.parse(localStorage.getItem('crzn'));
    let token=info.token;
    const user_id=info.id;
    setid(user_id);
    const fd=new FormData();
    fd.append('user_type',3);
    fd.append('user_id',user_id);
    const instance = axios.create({
      baseURL: 'http://localhost:9000/api/',
      headers: {
                  'Authorization': 'Bearer '+token,
                  "Content-Type": "multipart/form-data"
               }
    });
      instance.get(`qualification/all/${user_id}`,fd).then((res)=>setqualifictions(res.data)).catch((err)=>{console.log(err)});
      instance.post(`kyc/user`,fd).then((res)=>setkycinfo(res.data)).catch((err)=>{console.log(err)});
      instance.get(`emp_info/${user_id}`).then((res)=>setotherinfo(res.data)).catch((err)=>{console.log(err)});
  }
}, [flag]);



  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Item>   <Box sx={{ width: "100%" }}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Qualification" />
        <Tab label="Others Information" />
      </Tabs>
    </Box>
    <Item>
      <TabPanel value={tab} index={0}>
      {
        id?<Qualification emp_id={id} fun={setFlag}/>:<></>
      }
      {
        qualifictions.length?<Qualifications data={qualifictions}/>:<>Please Add Your Qualification Information</>
      }
      </TabPanel>
      <TabPanel value={tab} index={1}>

      {kycinfo?<KycView data={kycinfo}/>:id?<Kyc data={{user_id:id,user_type:3}}/>:<></>}
      </TabPanel> 
    </Item>
  </Box></Item>
 

  )
}
