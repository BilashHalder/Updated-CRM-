import React, { useEffect, useState } from "react";
import axios from "axios";
import Nominees from "src/components/Nominees";
import NomineeNew from "src/components/NomineeNew";
export default function index() {
  const [nominees, setNominees] = useState([]);
  const [id, setId] = useState(null);
  const [flag, setflag] = useState(0);
  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem("crzn"));
      let token = info.token;
      let id = info.id;
      setId(id);
      let data = new FormData();
      data.append("user_id", id);
      data.append("user_type", 2);
      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      instance
        .post("nominee/user", data)
        .then((res) => setNominees(res.data))
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [flag]);

  return (
    <div>
      {nominees ? <Nominees data={nominees} /> : <></>}
      {nominees.length < 3 ? (
        <NomineeNew user_id={id ? id : null} user_type={2} fun={setflag} />
      ) : (
        <></>
      )}
    </div>
  );
}
