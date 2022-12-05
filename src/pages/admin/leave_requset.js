import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { Item } from "src/util/lib";
import axios from "axios";
import RequestView from "src/components/request/RequestView";
import LeaveRequests from "src/components/leave/LeaveRequests";
import LeaveRequestView from "src/components/leave/LeaveRequestView";
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

export default function leave_requset() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [pending, setpending] = useState([]);
  const [view, setview] = useState([]);

  const viewData = (item) => {
    setview(item);
    setTab(2);
  };

  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem("crzn"));
      let token = info.token;
      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      instance
        .get("leave_application")
        .then((res) => {
          setData(res.data);
          let temp = res.data.filter((item) => {
            return item.status == 0;
          });
          setpending(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [flag]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Pending Leave Request" />
          <Tab label="All Leave Request" />
        </Tabs>
      </Box>
      <Item>
        <TabPanel value={tab} index={0}>
        <LeaveRequests
            data={pending}
            viewfun={viewData}
            title={"Pending Leave Request"}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <LeaveRequests
            data={data}
            viewfun={viewData}
            title={"All Leave Request"}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {view ? <LeaveRequestView data={view} fun={setFlag} /> : <>Invalid Request</>}
        </TabPanel>
      </Item>
    </Box>
  );
}
