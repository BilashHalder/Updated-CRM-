import { Grid } from '@mui/material'
import React,{useState,useEffect} from 'react'
import ReferralUsers from 'src/components/ReferralUsers'
import axios from 'axios';
import {Item} from '../../../../util/lib'
import Customer from 'src/components/Customer';
export default function index() {
    const [referrals, setreferrals] = useState([]);
    const [flag, setflag] = useState(0);
    const [ref_key, setref_key] = useState(null)
    useEffect(() => {
        if (localStorage) {
          let info=JSON.parse(localStorage.getItem('crzn'));
          let token=info.token;
          let ref_key=info.info.referral_key;
          setref_key(ref_key);
          const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
        instance.get(`customer/referral/${ref_key}`).then((res)=>setreferrals(res.data)).catch((err)=>{console.log(err)});
        }
       
      }, [flag])

  return (
    <Grid>
      <Item>
      {
      ref_key?<Customer ref_key={ref_key} fun={setflag} />:<></>
      }
      </Item>
        {
            referrals.length>0?<ReferralUsers data={referrals}/>:<></>
        }
    </Grid>
  )
}
