import React ,{useState,useEffect}from 'react';
import {useRouter} from 'next/router';



export default function info() {
 const [first, setfirst] = useState(useRouter())
  return (
    <div>{first.query.id}</div>
  )
}
