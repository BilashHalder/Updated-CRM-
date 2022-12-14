import {React,useState,useEffect} from 'react'
import PaymentCard from 'src/components/others/PaymentCard'
import { Item } from "src/util/lib";
import axios from 'axios';
import DepositList from 'src/components/deposit/DepositList';
export default function payments() {
  const [flag, setFlag] = useState(0);
  const [id, setid] = useState(null);
  const [depositHistory, setdepositHistory] = useState([]);



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
  }
}, [])









  return (
    <Item>
    {id? <PaymentCard data={{user_id:id,user_type:1,fun:setFlag}}/>:<></>}
    {
      depositHistory.length?<DepositList data={depositHistory}/>:<>No Deposit History Found</>
    }
    </Item>
  )
}
