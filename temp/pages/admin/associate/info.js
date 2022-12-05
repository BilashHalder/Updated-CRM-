import React, { useEffect ,useState  } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { ConsoleNetwork } from 'mdi-material-ui';
import Nominees from 'src/components/Nominees';
import BankAccounts from 'src/components/BankAccounts';
import InvesmentList from 'src/components/InvesmentList';
import CustomerList from 'src/components/admin/CustomerList';


export default function info() {
    
    const [Assinfo, setInfo] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [nominee, setNominees] = useState([]);
    const [invesments, setInvesments] = useState([]);
   


    useEffect(() => {
        if (localStorage) {
            let info = JSON.parse(localStorage.getItem('crzn'));
            let token = info.token;
            let data = new FormData();
            let id=1;
            data.append('user_id', id);
            data.append('user_type', 2);
            const instance = axios.create({
                baseURL: 'http://localhost:9000/api/',
                headers: {
                            'Authorization': 'Bearer '+token,
                            "Content-Type": "multipart/form-data"
                         }
              });
              instance.post('nominee/user',data).then((res)=>setNominees(res.data)).catch((err)=>{console.log(err.response.data)});
              instance.post('account/user',data).then((res)=>setAccounts(res.data)).catch((err)=>{console.log(err.response.data)});
              instance.get(`associate/${id}`).then((res)=>{
                setInfo(res.data);
                console.log(res.data)
                let ref_id=res.data.referral_key;
                instance.get(`customer/referral/${ref_id}`).then((res)=>setCustomers(res.data)).catch((err)=>{console.log(err)});
            
            }).catch((err)=>{console.log(err)});
            instance.post('invesment/user',data).then((res)=>setInvesments(res.data)).catch((err)=>{console.log(err.response.data)});
     
        }
    }, []);





    return (
        <div>
            
            {
            Assinfo?
        <>{Assinfo.name}</>:<></>
        }
        {
            nominee.length>0?<Nominees data={nominee}/>:<></>
        }
        {
            accounts.length>0?<BankAccounts data={accounts}/>:<></>
        }
        {
            invesments.length>0?<InvesmentList data={invesments}/>:<></>
        }
        {
            customers.length>0?<CustomerList data={customers}/>:<></>
        }
        
         </div>
    )
}
