import {React,useState,useEffect} from 'react';
import {Grid,Box,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PaymentNew from '../../../../components/Add/PaymentNew'
import PaymentInfo from '../../../../components/View/PaymentInfo'
import DepositHistory from '../../../../components/Tables/DepositHistory'
import Payment from 'src/components/Payment';
import DepositList from 'src/components/DepositList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function index() {
const [id, setId] = useState();
const [data, setData] = useState([]);  
const [flag, setFlag] = useState(0);


const updateFlag=()=>{
  setFlag(Math.random())
}

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

instance.post('deposit/user',data).then((res)=>setData(res.data)).catch((err)=>{console.log(err.response.data)});

  }
 
}, [flag])

  return (
   <>
   {
    id? <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        <PaymentInfo balance={0}/>
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        <Payment user_id={id} user_type={1} fun={updateFlag}/>
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        <DepositList data={data}/>
        </Item>
      </Grid>
    </Grid>
  </Box>:<></>
   }
   </>
  )
}
