
import Grid from '@mui/material/Grid'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import UserPayouts from 'src/components/UserPayouts'
import {React,useState,useEffect} from 'react'
import axios from 'axios'
// import InvesmentList from 'src/components/InvesmentList'

const index = () => {

  const [customer, setCustomer] = useState(null);
  const [invesments, setInvesments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let data=new FormData();
      data.append('user_id',info.id);
      data.append('user_type',1);

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });

      instance.get(`customer/${info.id}`).then((res)=>setCustomer(res.data)).catch((err)=>{console.log(err)});
      instance.post('invesment/user',data).then((res)=>setInvesments(res.data)).catch((err)=>{console.log(err.response.data)});
      instance.post('payment/user',data).then((res)=>setPayments(res.data)).catch((err)=>{console.log(err.response.data)});
    }
   
  }, [])
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
         {
          customer? <Trophy  title={`Hi,${customer.name}`} sub_title={"Thank You Chosing Us"} price={customer.balance} />:<></>
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
        {/* <UserPayouts user_id={1} user_type={1} /> */}
        {
          invesments.length>0?
          // <InvesmentList data={invesments}/>
          <></>
          :<></>
         }
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default index


// import React from 'react'

// export default function index() {
//   return (
//     <div>index</div>
//   )
// }
