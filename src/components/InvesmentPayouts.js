import  {React,useState,useEffect} from 'react';
import {Table,Divider,Chip} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Typography } from '@mui/material';


export default function InvesmentPayouts(props) {
  const {id}=props;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage) {
      let info=JSON.parse(localStorage.getItem('crzn'));
      let token=info.token;

      const instance = axios.create({
        baseURL: 'http://localhost:9000/api/',
        headers: {
                    'Authorization': 'Bearer '+token,
                    "Content-Type": "multipart/form-data"
                 }
      });
      instance.get(`payout/invesment/${id}`).then((res)=>setData(res.data)).catch((err)=>{console.log(err)});

    }
  }, [])
  
  return (
   <>
   {
    data.length>0?<TableContainer component={Paper}>
      <Typography sx={{textAlign:'center'}}>Payout History</Typography>
      <Divider/>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Transaction Id</TableCell>
          <TableCell align="right">Account No</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.transaction_id}
            </TableCell>
            <TableCell align="right">{row.account_no}</TableCell>
            <TableCell align="right">{row.date_time.slice(0,10)}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right"><Chip label={row.status==0?"Pending":row.status==1?"Success":"Cancel"} color={row.status==0?"primary":row.status==1?"success":"error"} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>:<>
  <Typography sx={{textAlign:'center'}}>No Payout Available</Typography>
  </>
   }
   </>
  );
}