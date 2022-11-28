
import Grid from '@mui/material/Grid'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import UserPayouts from 'src/components/UserPayouts'
import {React,useState,useEffect} from 'react'
import axios from 'axios'
import InvesmentList from 'src/components/InvesmentList'

const Dashboard = () => {

  const [associate, setassociate] = useState(null);
  const [invesments, setInvesments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let data=new FormData();
      data.append('user_id',info.id);
      data.append('user_type',2);

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });

      instance.get(`associate/${info.id}`).then((res)=>setassociate(res.data)).catch((err)=>{console.log(err)});
      instance.post('invesment/user',data).then((res)=>setInvesments(res.data)).catch((err)=>{console.log(err.response.data)});
      instance.post('payment/user',data).then((res)=>setPayments(res.data)).catch((err)=>{console.log(err.response.data)});
    }
   
  }, [])
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
         {
          associate? <Trophy  title={`Hi,${associate.name}`} sub_title={"Thank You Chosing Us"} price={associate.balance} />:<></>
         }
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <WeeklyOverview />
        </Grid>
         {
          payments.length>0?<Grid item xs={12} md={12} lg={812}>
          <DepositWithdraw transaction={payments}/>
        </Grid>:<></>
         }
        
        <Grid item xs={12}>
          {
          id?<UserPayouts user_id={id} user_type={2} />:<></>
         }
        
        {
          invesments.length>0?
          <InvesmentList data={invesments}/>:<></>
         }
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
