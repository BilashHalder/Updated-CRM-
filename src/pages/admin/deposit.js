import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box,Chip} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Deposits from "src/components/deposit/Deposits";
import DepositView from "src/components/deposit/DepositView";
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

export default function deposit() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [view, setview] = useState(null);


  const [pending, setpending] = useState([]);
  const [success, setsuccess] = useState([]);
  const [reject, setreject] = useState([]);

  const viewData=(item)=>{

    setview(item);
    setTab(4);
  };

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
         instance.get('deposit').then((res)=>{setData(res.data);
          let temp= res.data.filter((item)=>{
            return item.status==0;
          });
          setpending(temp);

          temp= res.data.filter((item)=>{
            return item.status==1;
          });
          setsuccess(temp);

          temp= res.data.filter((item)=>{
            return  item.status==2;
          });
          setreject(temp);
        
        }).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
//	0- 1- 2-
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Pending" />
          <Tab label="Success" />
          <Tab label="Rejected" />
          <Tab label="All Request" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
          <Deposits data={pending}   viewfun={viewData} title={"Pending Deposit List"}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
        <Deposits data={success}   viewfun={viewData} title={"Success Deposit List"}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
        <Deposits data={reject}   viewfun={viewData} title={"Rejected Deposit List"}/>
        </TabPanel>
        <TabPanel value={tab} index={3}>
        <Deposits data={data}   viewfun={viewData} title={"All Deposit"}/>
        </TabPanel>
        <TabPanel value={tab} index={4}>
          {
            view?<DepositView data={view} fun={setFlag}></DepositView>:<>Invalid Request</>
          }
        </TabPanel>
      </Item>
    </Box>
  );
}
