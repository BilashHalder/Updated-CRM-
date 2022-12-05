import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box,Chip} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Associates from "src/components/associate/Associates";
import Requests from "src/components/request/Requests";
import RequestView from "src/components/request/RequestView";
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

export default function request() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [view, setview] = useState(null);


  const [ba, setba] = useState([]);
  const [csp, setcsp] = useState([]);
  const [contact, setcontact] = useState([]);

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
         instance.get('others').then((res)=>{setData(res.data);
          let temp= res.data.filter((item)=>{
            return item.request_type==1 && item.status==0;
          });
          setcontact(temp);

          temp= res.data.filter((item)=>{
            return item.request_type==2 && item.status==0;
          });
          setcsp(temp);

          temp= res.data.filter((item)=>{
            return item.request_type==3 && item.status==0;
          });
          setba(temp);

        
        }).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="CSP Request" />
          <Tab label="BA Request" />
          <Tab label="Contact Request" />
          <Tab label="All Request" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
          <Requests data={csp}   viewfun={viewData} title={"CSP Request"}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
        <Requests data={ba}   viewfun={viewData} title={"BA Request"}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
        <Requests data={contact}  viewfun={viewData} title={"Contact Request"}/>
        </TabPanel>
        <TabPanel value={tab} index={3}>
        <Requests data={data}  viewfun={viewData} title={"All Request"}/>
        </TabPanel>
        <TabPanel value={tab} index={4}>
          {
            view?<RequestView data={view} fun={setFlag}></RequestView>:<>Invalid Request</>
          }
        </TabPanel>
      </Item>
    </Box>
  );
}
