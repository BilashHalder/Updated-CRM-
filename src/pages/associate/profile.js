import { Grid,Box } from '@mui/material'
import {React,useState,useEffect} from 'react'
import axios from 'axios';
import KycView from 'src/components/kyc/KycView';
import Kyc from 'src/components/kyc/Kyc';
import { Item } from "src/util/lib";
import CustomerCard from 'src/components/customer/CustomerCard';
import CustomerUpdateImage from 'src/components/customer/CustomerUpdateImage';
import CustomerUpdatePass from 'src/components/customer/CustomerUpdatePass';
export default function profile() {
const [kycinfo, setkycinfo] = useState(null);
const [id, setid] = useState(null);
const [flag, setflag] = useState(0);

const [userInfo, setuserInfo] = useState(null)



  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      const user_id=info.id;
      const fd=new FormData();
      setid(user_id);
      fd.append('user_type',2);
      fd.append('user_id',user_id);
      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
         instance.post('kyc/user',fd).then((res)=>{if(res.data.adhar_no)setkycinfo(res.data)
         else setkycinfo(null)}).catch((err)=>{console.log(err)});

         instance.get(`associate/${user_id}`).then((response)=>{setuserInfo(response)}).catch(console.log)
    }

  }, [flag])
  
  return (
<Item>
<Grid container>
<Grid md={12} sm={12}>
{userInfo?<CustomerCard data={userInfo}/>:<></>}
</Grid>

<Grid md={6} sm={12} sx={{padding:'4%'}}>
{kycinfo?<KycView data={kycinfo}/>:<>
{
  id?<Kyc data={{user_id:id,user_type:2,fun:setflag}}/>:<>Please Try Again Later</>
}
</>}
</Grid>

<Grid md={6} sm={12} sx={{padding:'4%'}}>
 <Box sx={{m:5}}>
 <CustomerUpdateImage data={{user_id:id,fun:setflag}}/>
 </Box>
<Box sx={{my:10}}>
<CustomerUpdatePass data={{user_id:id,fun:setflag}}/>
</Box>

</Grid>



</Grid>
</Item>
  )
}
