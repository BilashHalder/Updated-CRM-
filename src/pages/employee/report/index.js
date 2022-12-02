import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Item} from '../../../../util/lib'
import ApproveReport from 'src/components/ApproveReport';
import Report from 'src/components/Report';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}  aria-labelledby={`simple-tab-${index}`} {...other} >
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
  return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,};
}

export default function index() {
  const [value, setValue] =useState(0);
  const [flag, setFlag] = useState(0);
  const [id, setId] = useState(null);
  const [pending, setPending] = useState([]);

useEffect(() => {
  if (localStorage) {
    let info=JSON.parse(localStorage.getItem('crzn'));
    let token=info.token;
    let id=info.id;
    setId(id);
    const instance = axios.create({
      baseURL: 'http://localhost:9000/api/',
      headers: {
                  'Authorization': 'Bearer '+token,
                  "Content-Type": "multipart/form-data"
               }
    });
    instance.get('report').then((res)=>{
     let temp= res.data.filter((item)=>{return item.report_to==id});
     setPending(temp)
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
          <Tab label="Approve Work Reports" {...a11yProps(0)} />
          <Tab label="Submit Work Reports" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
      <ApproveReport data={pending} fun={setFlag}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Report/>
      </TabPanel>
    </Box>
    </Item>
  );
}