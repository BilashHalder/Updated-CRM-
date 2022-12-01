import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import axios from "axios";
import RequsetAll from "src/components/admin/RequsetAll";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function index() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);


  const [contacts, setcontacts] = useState([]);
  const [csp, setcsp] = useState([]);
  const [ba, setba] = useState([]);


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
        .get("others")
        .then((res) => {
          setData(res.data);
         let temp= res.data.filter((item)=>{
            return item.request_type==1 && item.status==0;
          });
          setcontacts(temp);
          temp= res.data.filter((item)=>{
            return item.request_type==2 && item.status==0;
          });
          setcsp(temp);
          temp= res.data.filter((item)=>{
            return item.request_type==3 && item.status==0;
          });
          setba(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [flag]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Item>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Contact Us" {...a11yProps(0)} />
            <Tab label="CSP Request" {...a11yProps(1)} />
            <Tab label="BA Request" {...a11yProps(2)} />
            <Tab label="All Request" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {contacts.length > 0 ? (
            <RequsetAll
              data={contacts}
              title={"Contact Us Requset"}
              fun={setFlag}
            />
          ) : (
            <>
              <Typography>No Data Found</Typography>
            </>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {csp.length > 0 ? (
            <RequsetAll data={csp} title={"CSP Requset"} fun={setFlag} />
          ) : (
            <>
              <Typography>No Data Found</Typography>
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RequsetAll data={ba} title={"BA Requset"} fun={setFlag} />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <RequsetAll data={data} title={"All Request"} fun={setFlag} />
        </TabPanel>
      </Box>
    </Item>
  );
}
