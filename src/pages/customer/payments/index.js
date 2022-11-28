import React, { useEffect, useState } from "react";
import axios from "axios";
import Deposit from "src/components/Deposit";
import DepositList from "src/components/DepositList";
import DepositInfo from "src/components/DepositInfo";

export default function index() {
  const [deposits, setDeposits] = useState([]);
  const [id, setId] = useState(null);
  const [info, setinfo] = useState(null)
  const [flag, setflag] = useState(0);
  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem("crzn"));
      setinfo(info);
      let token = info.token;
      let id = info.id;
      setId(id);
      let data = new FormData();
      data.append("user_id", id);
      data.append("user_type", 1);
      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      instance
        .post("deposit/user", data)
        .then((res) => setDeposits(res.data))
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [flag]);

  return (
    <div>
      {
        info?<DepositInfo info={info}/>:<></>
      }
      {
        id?<Deposit user_id={id} user_type={1} fun={setflag} />:<></>
      }
      {deposits ? <DepositList data={deposits}/>: <></>}
      
    </div>
  );
}
