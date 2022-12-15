import { Grid, Typography } from '@mui/material'
import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { Item } from "src/util/lib";
import CustomerReferrals from 'src/components/referral/CustomerReferrals';
import Customer from 'src/components/customer/Customer';


export default function referral() {

  const [referal, setreferal] = useState([]);
  const [flag, setflag] = useState(0);
  const [refkey, setrefkey] = useState(null)
  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const user_id=info.id;
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

         instance.get(`customer/${user_id}`).then((response)=>{

          if(response.data.referral_key){
            setrefkey(response.data.referral_key);
            instance.get(`customer/referral/${response.data.referral_key}`).then((result)=>{
              setreferal(result.data)
            }).
            catch(console.log)
          }
         }).catch(console.log)
    }

  }, [flag])


  return (
   <Item>
{
  refkey?<>
  <Typography color={'red'}>Don't Edit Referel Code</Typography>
  <Customer ref_key={refkey} fun={setflag}/>
  </>:<></>
}
   {
    referal.length?<> <CustomerReferrals data={referal}/></>:<>Sorry No Data Found</>
   }
   </Item>
  )
}
