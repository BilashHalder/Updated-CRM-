const axios =require('axios');
const axiosClient=(token)=>{
   return (axios.create({
    baseURL: 'http://localhost:9000/api/',
    timeout: 1000,
    headers: {
                'Authorization': 'Bearer '+token,
                "Content-Type": "multipart/form-data"
             }
  }))
}

  module.exports={axiosClient};