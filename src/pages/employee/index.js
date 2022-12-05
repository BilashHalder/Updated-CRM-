
// import Grid from '@mui/material/Grid'

// import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// // ** Demo Components Imports

// import Trophy from 'src/views/dashboard/Trophy'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import UserPayouts from 'src/components/UserPayouts'
// import {React,useState,useEffect} from 'react'
// import axios from 'axios'
// import InvesmentList from 'src/components/InvesmentList'

// const Dashboard = () => {

//   const [employee, setEmployee] = useState(null);
//   const [invesments, setInvesments] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [id, setId] = useState();

//   useEffect(() => {
//     if (localStorage) {
//       let info=JSON.parse(localStorage.getItem('crzn'));
//       let token=info.token;
//       let data=new FormData();
//       data.append('user_id',info.id);
//       data.append('user_type',3);

//       const instance = axios.create({
//         baseURL: 'http://localhost:9000/api/',
//         headers: {
//                     'Authorization': 'Bearer '+token,
//                     "Content-Type": "multipart/form-data"
//                  }
//       });

//       instance.get(`employee/${info.id}`).then((res)=>setEmployee(res.data)).catch((err)=>{console.log(err)});
//       instance.post('payment/user',data).then((res)=>setPayments(res.data)).catch((err)=>{console.log(err.response.data)});
//     }
   
//   }, [])
//   return (
//     <ApexChartWrapper>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={4}>
//          {
//           employee? <Trophy  title={`Hi,${employee.name}`} sub_title={"Thank You Chosing Us"} price={employee.balance} />:<></>
//          }
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <StatisticsCard />
//         </Grid>
//         <Grid item xs={12} md={12} lg={12}>
//           <WeeklyOverview />
//         </Grid> 
//         <Grid item xs={12}>
//           {
//           id?<UserPayouts user_id={id} user_type={3} />:<></>
//          }
        
//         </Grid>
//       </Grid>
//     </ApexChartWrapper>
//   )
// }

// export default Dashboard
