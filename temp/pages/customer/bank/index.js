import React,{useEffect,useState} from 'react'
import axios from 'axios';
import BankAccounts from 'src/components/BankAccounts';
import BankAccountNew from 'src/components/BankAccountNew';
export default function index() { 
  const [accounts, setAccounts] = useState([]);
  const [id, setId] = useState(null);
  const [flag, setflag] = useState(0);

  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let id=info.id;
      setId(id);
      let data=new FormData();
      data.append('user_id',id);
      data.append('user_type',1);



      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
  
  //     let data=new FormData();
  // data.append('basic',1000);data.append('hra',1000);data.append('conveyance',1000);data.append('medical',1000);
  // data.append('special',1000);data.append('pf',1000);data.append('insurance',1000);data.append('tax',1000);
  instance.post('account/user',data).then((res)=>setAccounts(res.data)).catch((err)=>{console.log(err.response.data)});
    // instance.get('customer').then((res)=>console.log(res.data)).catch((err)=>{console.log(err)});
    // instance.get('customer').then((res)=>console.log(res.data)).catch((err)=>{console.log(err)});
    }
   
  }, [flag])
  
  return (
    <div>{
      accounts?<BankAccounts data={accounts}/>:<></>
    }
    {
      accounts.length<3?<BankAccountNew user_id={id?id:null} user_type={1} fun={setflag}/>:<></>
    }</div>
  )
}
