import React,{useEffect,useState} from 'react'
import axios from 'axios';

export default function Report() {
  const [id, setId] = useState(null);
  const [flag, setflag] = useState(0);
  const [report, setReport] = useState(null)
  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;
      let id=info.id;
    
      setId(id);
      let data=new FormData();

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
  

    instance.get(`report/employee/${id}`).then((res)=>setReport(res.data)).catch((err)=>{console.log(err)});

    }
   
  }, [flag])
  


  return (
    <div>{
      report?<>{
        report.status==2?<>
        
        </>:<>Work Report Already Submitted</>

      }</>:<>No report Information found</>
      }</div>
  )
}
