import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import Salaryees from "src/components/salary/Salaryees";
import Salary from "src/components/salary/Salary";
import SalaryEdit from "src/components/salary/SalaryEdit";
import SalaryView from "src/components/salary/SalaryView";
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

export default function salary() {
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
         instance.get('salary').then((res)=>setData(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="All Salary" />
          <Tab label="Add New Salary Info" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
         <Salaryees data={data}  editfun={editData} viewfun={viewData}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Salary fun={setFlag}/>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {
            view?<SalaryView data={view}></SalaryView>:<>Invalid Request</>
          }
        </TabPanel>
        <TabPanel value={tab} index={3}>
         {
          edit?<SalaryEdit data={edit} fun={setFlag}></SalaryEdit>:<>Invalid Request</>
         }
        </TabPanel>
      </Item>
    </Box>
  );
}
