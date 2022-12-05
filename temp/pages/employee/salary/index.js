import React, { useEffect, useState } from 'react'
import SalaryHistory from 'src/components/SalaryHistory'
import axios from 'axios';

export default function index() {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem('crzn'));
      let token = info.token;
      let id = info.id;
      let data = new FormData();
      data.append('user_id', id);
      data.append('user_type', 3);

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "multipart/form-data"
        }
      });

      instance.post('payment/user', data).then((res) => setData(res.data)).catch((err) => { console.log(err.response.data) });

    }

  }, [])
  return (
    <div>
      {
        data ? <SalaryHistory data={data} /> : <></>
      }

    </div>
  )
}
