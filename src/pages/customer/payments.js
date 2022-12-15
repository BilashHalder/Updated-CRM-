import {React,useState,useEffect} from 'react'
import PaymentCard from 'src/components/others/PaymentCard'
import { Tabs, Tab, Typography, Box, Grid, } from "@mui/material";

import WithdrawalCard from 'src/components/others/WithdrawalCard';
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
import { Item } from "src/util/lib";
import axios from 'axios';
import DepositList from 'src/components/deposit/DepositList';
import Withdrawals from 'src/components/withdrawal/Withdrawals';
export default function payments() {
  const [flag, setFlag] = useState(0);
  const [id, setid] = useState(null);
  const [depositHistory, setdepositHistory] = useState([]);
  const [withdrwalHistory, setwithdrwalHistory] = useState([]);
  const [tab, setTab] = useState(0);


useEffect(() => {
  if (localStorage) {
    let info=JSON.parse(localStorage.getItem('crzn'));
    let token=info.token;
    const user_id=info.id;
    setid(user_id);
    const fd=new FormData();
    fd.append('user_type',1);
    fd.append('user_id',user_id);
    const instance = axios.create({
      baseURL: 'http://localhost:9000/api/',
      headers: {
                  'Authorization': 'Bearer '+token,
                  "Content-Type": "multipart/form-data"
               }
    });
       instance.post('deposit/user',fd).then((res)=>setdepositHistory(res.data)).catch((err)=>{console.log(err)});
       instance.post('payout/withdrawals/user',fd).then((res)=>setwithdrwalHistory(res.data)).catch((err)=>{console.log(err)});
  }
}, [flag])

const handleChange = (event, newValue) => {
  setTab(newValue);
}

  return (
    <Item>
       <Grid container>
       <Grid item md={12} sx={{textAlign:'center'}}>
       <Tabs value={tab} onChange={handleChange} orientation="">
            <Tab label="Deposit" />
            <Tab label="Withdrawal" />
          </Tabs>
       <TabPanel value={tab} index={0}>
       {id? <PaymentCard data={{user_id:id,user_type:1,fun:setFlag}}/>:<></>}
    {
      depositHistory.length?<DepositList data={depositHistory}/>:<>No Deposit History Found</>
    }
       </TabPanel>
       <TabPanel value={tab} index={1}>
       {
    id?<WithdrawalCard data={{user_id:id,user_type:1}} fun={setFlag}/>:<></>
  }
  {
  withdrwalHistory.length?<>
  <Withdrawals data={withdrwalHistory}/>
  </>:<>No Record Found</>

  }

       </TabPanel>
       </Grid>
       </Grid>
    </Item>
  )
}
