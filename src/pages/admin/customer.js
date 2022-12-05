import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import CustomerView from "src/components/customer/CustomerView";
import CustomerEdit from "src/components/customer/CustomerEdit";
import Customers from "src/components/customer/Customers";
import Customer from "src/components/customer/Customer";
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

export default function associate() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [edit, setedit] = useState(null);
  const [view, setview] = useState(null)

  const viewData=(item)=>{

    setview(item);
    setTab(2);
  };

  const editData=(item)=>{
  setedit(item);
    setTab(3);
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
         instance.get('customer').then((res)=>setData(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="All Customer" />
          <Tab label="Add New Customer" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>    
         <Customers data={data}  editfun={editData} viewfun={viewData}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
        <Customer fun={setFlag}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {
            view?<CustomerView data={view}></CustomerView>:<>Invalid Request</>
          }
        </TabPanel>
        <TabPanel value={tab} index={3}>
         {
          edit?<CustomerEdit data={edit} fun={setFlag}></CustomerEdit>:<>Invalid Request</>
         }
        </TabPanel>
      </Item>
    </Box>
  );
}
