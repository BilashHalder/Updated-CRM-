import React,{useState,useEffect} from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Item} from '../../../../util/lib'
import LeaveHistory from 'src/components/LeaveHistory';
import LeaveApply from 'src/components/LeaveApply';
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function index() {
  const [value, setValue] =useState(0);
  const [data, setData] = useState([]);
  const [remain, setremain] = useState({});
  const [flag, setFlag] = useState(0);


  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let id=info.id;
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
         instance.get(`leave_application/employee/${id}`).then((res)=>setData(res.data)).catch((err)=>{console.log(err)});
         instance.get(`leave_remain/employee/${id}`).then((res)=>setremain(res.data)).catch((err)=>{console.log(err)});
    }
  }, [flag])
  


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Item>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="History" {...a11yProps(0)} />
          <Tab label="Apply Leave" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <LeaveHistory data={data} fun={setFlag}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LeaveApply data={remain} fun={setFlag} show={data.length?false:true}/>
      </TabPanel>
    </Box>
    </Item>
  );
}