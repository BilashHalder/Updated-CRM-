import {React,useState,useEffect} from 'react';
import {Grid,Box,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PaymentNew from '../../../../components/Add/PaymentNew'
import PaymentInfo from '../../../../components/View/PaymentInfo'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function index() {
const [id, setid] = useState();
const [info, setInfo] = useState(null);  
useEffect(() => {






  if(localStorage.getItem('crzn') &&  JSON.parse(localStorage.getItem('crzn')).id ){
    let aid=JSON.parse(localStorage.getItem('crzn')).id;

    setid(aid);

    let data = new FormData();
    data.append('user_id',id?id:JSON.parse(localStorage.getItem('crzn')).id);
    data.append('user_type',2);
    axios({
      method: "get",
      url: `http://localhost:9000/api/associate/${aid}`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response)=> {
        setInfo(response.data)
      })
      .catch((err)=> {
       console.log(err);
      });
  }
   

 else{
  setid(null);
 }
}, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" component="h5" sx={{textAlign:'center'}}> My Payment History</Typography>
    <Grid container spacing={2} sx={{marginTop:'3%'}}>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        <PaymentInfo balance={info && info.balance?info.balance:0}/>
        </Item>
      </Grid>
    </Grid>
  </Box>
  )
}
