import React, { useState, useEffect } from "react";
import {Tabs,Tab,Typography,Box} from "@mui/material";
import { Item } from "src/util/lib";
import axios from 'axios';


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



export default function info() {
  const [tab, setTab] = useState(0);
  const [flag, setFlag] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Item>   <Box sx={{ width: "100%" }}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Qualification" />
        <Tab label="Others Information" />
      </Tabs>
    </Box>
    <Item>
      <TabPanel value={tab} index={0}>
        bas
      </TabPanel>
      <TabPanel value={tab} index={1}>
        sjjs
      </TabPanel> 
    </Item>
  </Box></Item>
 

  )
}
