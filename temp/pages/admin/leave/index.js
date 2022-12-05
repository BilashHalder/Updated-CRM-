import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {Grid, Paper} from '@mui/material'
import axios from 'axios';
import Leave from 'src/components/admin/Leave';
import LeaveList from 'src/components/admin/LeaveList';
import LeaveRequestList from 'src/components/admin/LeaveRequestList';
import Holidays from 'src/components/admin/Holidays';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function index() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [holidays, setholidays] = useState([])
  const [requestlist, setrequest] = useState([]);
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
         instance.get('leave').then((res)=>setData(res.data)).catch((err)=>{console.log(err)});
         instance.get('holidays').then((res)=>setholidays(res.data)).catch((err)=>{console.log(err)});
         instance.get('leave_application').then((res)=>{
          console.log(res.data)
          let pending=res.data.filter((item)=>{return item.status=='0'})
          setrequest(pending);
         }).catch((err)=>{console.log(err)});
    }
   
  }, [flag])
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
   <Item>
     <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Leave List" {...a11yProps(0)} />
          <Tab label="Add Leave" {...a11yProps(1)} />
          <Tab label="Leave Request" {...a11yProps(2)} />
          <Tab label="Holiday" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LeaveList data={data} fun={setFlag}/>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Leave fun={setFlag}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LeaveRequestList data={requestlist} fun={setFlag}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Holidays/>
      </TabPanel>
    </Box>
   </Item>
  );
}