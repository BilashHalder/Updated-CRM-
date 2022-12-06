import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Nominees from "src/components/nominee/Nominees";
import Nominee from "src/components/nominee/Nominee";
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

export default function nominee() {
  const [tab, setTab] = useState(0);
  const [flag, setFlag] = useState(0);
  const [id, setid] = useState(null);
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
         instance.post('nominee/user',fd).then((res)=>setnominee(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="My Nominees" />
         {
          nominee.length<3? <Tab label="Add New Nominee" />:<></>
         }
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
          <Nominees data={nominee} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {
            id?<Nominee user_id={id} user_type={1} fun={setFlag}/>:<></>
            }
        </TabPanel> 
      </Item>
    </Box>
  );
}
