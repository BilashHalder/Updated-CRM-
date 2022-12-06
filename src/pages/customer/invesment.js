import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box,Grid} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Invesment from "src/components/invesment/Invesment";
import InvesmentsList from "src/components/invesment/InvesmentList";
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

export default function invesment() {
  const [tab, setTab] = useState(0);
  const [flag, setFlag] = useState(0);
  const [id, setid] = useState(null);
  const [actives, setactive] = useState([]);
  const [pending, setpending] = useState([]);
  const [closed, setclosed] = useState([]);
  const [Withdrawals, setWithdrawals] = useState([]);
const viewFun=(item)=>{
  console.log(item);
}





  const [nominee, setnominee] = useState([]);


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
         instance.post('invesment/user',fd).then((res)=>{
          //	0-pending 1-Active 2-withdraw 3-close	
            let temp=res.data.filter((item)=>{return item.status==0})
            setpending(temp);
            temp=res.data.filter((item)=>{return item.status==1})
            setactive(temp);
            temp=res.data.filter((item)=>{return item.status==2})
            setWithdrawals(temp);
            temp=res.data.filter((item)=>{return item.status==3})
            setclosed(temp);
         }).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (


  <Item>
<Grid container>
  <Grid item md={3}>
  <Tabs value={tab} onChange={handleChange} orientation="vertical">
          <Tab label="New Invesment" />
          <Tab label="Active" />
          <Tab label="Pending" />
          <Tab label="Withdrawal" />
          <Tab label="Close" />
        </Tabs>
  </Grid>
  <Grid item md={9}>
  <TabPanel value={tab} index={0} >
        {
          id?<Invesment user_id={id} user_type={1} fun={setFlag}/>:<></>
        }
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <InvesmentsList data={actives} viewfun={viewFun} title="Your Active Invesment"/>
          </TabPanel> 
         <TabPanel value={tab} index={2}> <InvesmentsList data={pending} viewfun={viewFun} title="Your Pending Invesment"/> </TabPanel> 
         <TabPanel value={tab} index={3}> <InvesmentsList data={Withdrawals} viewfun={viewFun} title="Your Withdrawal Invesment"/> </TabPanel> 
          <TabPanel value={tab} index={4}> <InvesmentsList data={closed} viewfun={viewFun} title="Your Closed Invesment"/> </TabPanel> 
</Grid>
</Grid>
  </Item>
  );
}
