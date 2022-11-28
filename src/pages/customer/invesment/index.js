import React, { useEffect, useState } from "react";
import axios from "axios";
import Invesment from "src/components/Invesment";
import InvesmentList from "src/components/InvesmentList";

export default function index() {
  const [invesments, setInvesments] = useState([]);
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
        .post("invesment/user", data)
        .then((res) => setInvesments(res.data))
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [flag]);

  return (
    <div>
      {
        id?<Invesment user_id={id} user_type={1} fun={setflag}/>:<></>
      }
      {invesments ? <InvesmentList data={invesments}/>: <></>}
      
    </div>
  );
}
