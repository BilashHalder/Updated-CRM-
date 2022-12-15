import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Box, Grid } from "@mui/material";
import { Item } from "src/util/lib";
import axios from "axios";
import Invesment from "src/components/invesment/Invesment";
import InvesmentsList from "src/components/invesment/InvesmentsList";
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
  const [flag, setFlag] = useState(0);
  const [id, setid] = useState(null);
  const [actives, setactive] = useState([]);
  const [pending, setpending] = useState([]);
  const [closed, setclosed] = useState([]);
  const [Withdrawals, setWithdrawals] = useState([]);
const viewFun=(item)=>{
  console.log(item);
}
  const [nominee, setnominee] = useState([]);
  const [withdrwan, setWithdrwan] = useState([]);
  const [active, setActive] = useState([]);

  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem("crzn"));
      let token = info.token;
      const user_id = info.id;
      setid(user_id);
      const fd = new FormData();
      fd.append("user_type", 2);
      fd.append("user_id", user_id);
      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      instance
        .post("invesment/user", fd)
        .then((res) => {
          console.log(res.data);
          let temp = res.data.filter((item) => {
            return item.status == 1;
          });
          setActive(temp);
          temp = res.data.filter((item) => {
            return item.status == 0;
          });
          setPending(temp);
          temp = res.data.filter((item) => {
            return item.status == 2;
          });
          setWithdrwan(temp);
          temp = res.data.filter((item) => {
            return item.status == 3;
          });
          setClosed(temp);
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
    <Item>
      <Grid container>
        <Grid item md={3}>
          <Tabs value={tab} onChange={handleChange} orientation="vertical">
            <Tab label="New Invesment" />
            <Tab label="Active" />
            <Tab label="Pending" />
            <Tab label="Withdrawal" />
            <Tab label="Close" />
          </Tabs>
        </Grid>
        <Grid item md={9}>
          <TabPanel value={tab} index={0}>
            {id ? (
              <Invesment user_id={id} user_type={2} fun={setFlag} />
            ) : (
              <></>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {active.length > 0 ? (
              <InvesmentsList data={active} title={"Active Invesments"} />
            ) : (
              <>Sorry no active invesment found</>
            )}
          </TabPanel>
          <TabPanel value={tab} index={2}>
            {pending.length > 0 ? (
              <InvesmentsList data={pending} title={"Pending Invesments"} />
            ) : (
              <>Sorry no pending invesment found</>
            )}
          </TabPanel>
          <TabPanel value={tab} index={3}>
            {withdrwan.length > 0 ? (
              <InvesmentsList data={withdrwan} title={"Withdrwan Invesments"} />
            ) : (
              <>Sorry no invesment found</>
            )}
          </TabPanel>
          <TabPanel value={tab} index={4}>
            {closed.length > 0 ? (
              <InvesmentsList data={closed} title={"Closed Invesments List"} />
            ) : (
              <>Sorry no invesment found</>
            )}
          </TabPanel>
        </Grid>
      </Grid>
    </Item>
  );
}
