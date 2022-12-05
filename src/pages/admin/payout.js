import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box, Grid, Input, Button} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';
import InvesmentActive from "src/components/payout/InvesmentActive";
import SalaryPayment from "src/components/payout/SalaryPayment";
import WithdrawalRequest from "src/components/payout/WithdrawalRequest";
import SalaryView from "src/components/payout/SalaryView";
import InvesmentView from "src/components/payout/InvesmentView";
import WithdrawalView from "src/components/payout/WithdrawalView";
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

export default function payout() {
  const [tab, setTab] = useState(0);
  const [flag, setFlag] = useState(0);
  const [edit, setedit] = useState(null);
  const [view, setview] = useState(null);

  const [invesments, setInvesments] = useState([]);
  const [salary, setSalary] = useState([]);
  const [widrwal, setWidrwal] = useState([]);

  const [invesmentview, setinvesmentview] = useState(null);
  const [salaryview, setsalaryview] = useState(null);
  const [widrwalview, setwidrwalview] = useState(null)




  const ViewSalary=(item)=>{
      setsalaryview(item);
      setTab(3);
  }

  const ViewInvesment=(item)=>{
       setinvesmentview(item);
       setTab(4);
  }
  const ViewWidrwal=(item)=>{
setwidrwalview(item);
setTab(5);

  }

 
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
        instance.get('payout/salary').then((res)=>{
          setSalary(res.data);
        }).catch((err)=>{console.log(err)});
        instance.get('payout/invesments').then((res)=>{
          setInvesments(res.data)
        }).catch((err)=>{console.log(err)});
        instance.get('payout/withdrawals').then((res)=>{
          setWidrwal(res.data)
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
          <Tab label="Invesment" />
          <Tab label="Salary" />
          <Tab label="Withdrawal Request" />
          <Tab  />
          <Tab  />
          <Tab  />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
          <InvesmentActive data={invesments} fun={setFlag} viewfun={ViewInvesment}/>
        </TabPanel>

        <TabPanel value={tab} index={1}>
         <SalaryPayment data={salary} fun={setFlag} viewfun={ViewSalary}/>
        </TabPanel>

        <TabPanel value={tab} index={2}>
       <WithdrawalRequest data={widrwal} fun={setFlag} viewfun={ViewWidrwal}/>
      </TabPanel>

      <TabPanel value={tab} index={3}>
        {
          salaryview?<>
                <SalaryView data={salaryview}/>
          </>:<>Invalid Request</>
        }
      </TabPanel>

      <TabPanel value={tab} index={4}>
        {
          invesmentview?<>
    <InvesmentView data={invesmentview}/>
          </>:<>Invalid Request</>
        }
      </TabPanel>

      <TabPanel value={tab} index={5}>
        {
          widrwalview?<>
          <WithdrawalView data={widrwalview}/>
          </>:<>Invalid Request</>
        }
      </TabPanel>



      </Item>
    </Box>
  );
}
