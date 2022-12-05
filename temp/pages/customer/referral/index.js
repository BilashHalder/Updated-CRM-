import { Grid } from '@mui/material'
import React,{useState,useEffect} from 'react'
import ReferralUsers from 'src/components/ReferralUsers'
import axios from 'axios';
export default function index() {
    const [referrals, setreferrals] = useState([]);
    useEffect(() => {
        if (localStorage) {
          let info=JSON.parse(localStorage.getItem('crzn'));
          let token=info.token;
          let ref_key=info.info.referral_key
          const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
        instance.get(`customer/referral/${ref_key}`).then((res)=>setreferrals(res.data)).catch((err)=>{console.log(err)});
        }
       
      }, [])

  return (
    <Grid>
        {
            referrals.length>0?<ReferralUsers data={referrals}/>:<></>
        }
    </Grid>
  )
}
