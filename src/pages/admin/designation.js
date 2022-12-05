import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Designations from "src/components/designation/Designations";
import DesignationEdit from "src/components/designation/DesignationEdit";
import Designation from "src/components/designation/Designation";
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

export default function designation() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [edit, setedit] = useState(null);



  const editData=(item)=>{
  setedit(item);
    setTab(2);
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
         instance.get('designation').then((res)=>setData(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="All Designations" />
          <Tab label="Add New Designation" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
         <Designations data={data}  editfun={editData}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Designation fun={setFlag}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {
            edit?<DesignationEdit data={edit} fun={setFlag}></DesignationEdit>:<>Invalid Request</>
          }
        </TabPanel>
      </Item>
    </Box>
  );
}
