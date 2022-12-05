import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import EmployeeEdit from "src/components/employee/EmployeeEdit";
import EmployeeView from "src/components/employee/EmployeeView";
import Employees from "src/components/employee/Employees";
import Employee from "src/components/employee/Employee";
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

export default function employee() {
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
         instance.get('employee').then((res)=>setData(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="All Employee" />
          <Tab label="Add New Employee" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
         <Employees data={data}  editfun={editData} viewfun={viewData}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Employee fun={setFlag}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {
            view?<EmployeeView data={view}></EmployeeView>:<>Invalid Request</>
          }
        </TabPanel>
        <TabPanel value={tab} index={3}>
         {
          edit?<EmployeeEdit data={edit} fun={setFlag}></EmployeeEdit>:<>Invalid Request</>
         }
        </TabPanel>
      </Item>
    </Box>
  );
}
