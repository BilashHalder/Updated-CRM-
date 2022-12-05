import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Associates from "src/components/associate/Associates";
import AssociateView from "src/components/associate/AssociateView";
import AssociateEdit from "src/components/associate/AssociateEdit";
import Invesments from "src/components/invesment/Invesments";
import InvesmentEdit from "src/components/invesment/InvesmentEdit";
import InvesmentView from "src/components/invesment/InvesmentView";
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
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [edit, setedit] = useState(null);
  const [view, setview] = useState(null);
  const [active, setactive] = useState([]);
  const [pending, setpending] = useState([]);
  const [closed, setclosed] = useState([]);
  const [withdraw, setwithdraw] = useState([]);




  const viewData=(item)=>{

    setview(item);
    setTab(6);
  };

  const editData=(item)=>{
  setedit(item);
    setTab(7);
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
         instance.get('invesment').then((res)=>{
          setData(res.data);
         let temp=res.data.filter((item)=>{return item.status==0});
          setpending(temp);
          temp=res.data.filter((item)=>{return item.status==1});
          setactive(temp);
          temp=res.data.filter((item)=>{return item.status==2});
          setwithdraw(temp);
          temp=res.data.filter((item)=>{return item.status==3});
          setclosed(temp);

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
          <Tab label="Pending " />
          <Tab label="Active " />
          <Tab label="Withdraw " />
          <Tab label="Closed " />
          <Tab label="All" />
          <Tab label="New Invesments" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
         <Invesments  data={pending}  editfun={editData} viewfun={viewData} title={'Pending Invesments'}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
         <Invesments  data={active}  editfun={editData} viewfun={viewData} title={'Active Invesments'}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
         <Invesments  data={withdraw}  editfun={editData} viewfun={viewData} title={'Withdraw Invesments'}/>
        </TabPanel>
        <TabPanel value={tab} index={3}>
         <Invesments  data={closed}  editfun={editData} viewfun={viewData} title={'Closed Invesments'}/>
        </TabPanel>
        <TabPanel value={tab} index={4}>
         <Invesments  data={data}  editfun={editData} viewfun={viewData} title={'All Invesments'}/>
        </TabPanel>
        <TabPanel value={tab} index={5}>
          Add New Invesment
        </TabPanel>
        <TabPanel value={tab} index={6}>
          {
            view?<InvesmentView data={view}></InvesmentView>:<>Invalid Request</>
          }
        </TabPanel>
        <TabPanel value={tab} index={7}>
         {
          edit?<InvesmentEdit data={edit} fun={setFlag}></InvesmentEdit>:<>Invalid Request</>
         }
        </TabPanel>
      </Item>
    </Box>
  );
}
