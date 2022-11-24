import {React,useState,useEffect} from 'react';
import {Grid,Box,Typography,Paper,Table,Stack,Drawer,TableBody,TableCell,TableContainer,TableHead,TableRow,Avatar, Button} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import CustomerNew from '../../../../components/Add/CustomerNew'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function index() {
const [id, setid] = useState();
const [customer, setCustomer] = useState([]); 
const [info, setInfo] = useState(null);  




useEffect(() => {
  if(localStorage.getItem('crzn') &&  JSON.parse(localStorage.getItem('crzn')).id ){
    setid(JSON.parse(localStorage.getItem('crzn')).id);

    let data = new FormData();
    data.append('user_id',id?id:JSON.parse(localStorage.getItem('crzn')).id);
    data.append('user_type',2);
      axios({
        method: "get",
        url: `http://localhost:9000/api/associate/${JSON.parse(localStorage.getItem('crzn')).id}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response)=> {
          setInfo(response.data);
            axios({
              method: "get",
              url: `http://localhost:9000/api/associate/referral/${response.data.referral_key}`,
              data: data,
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res)=> {
              console.log(res)
            setCustomer(res.data);
            }).
              catch((err)=>{
            console.log(err)
              })
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
      <Typography variant="h5" component="h5" sx={{textAlign:'center'}}> My Customer Information</Typography>
      <Grid container spacing={2} sx={{marginTop:'3%'}}>
      <Grid item xs={12} sm={12} md={12}>
        <Item>
        {customer?<>
          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name </TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone No</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customer.map((row) => (
            <TableRow
              key={row.account_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Stack spacing={2} direction="row">
   <Avatar  alt={row.name} src={`http://localhost:9000/uploads/images/${row.image}`}/> 
<Typography variant="span" component="p">  {row.name}</Typography>
</Stack>
             
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.status==1?"Active":"Not Active"}</TableCell>
              <TableCell align="right"><Button variant="outlined" size="small">View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        
        </>:<Typography variant="h6" component="h6" sx={{textAlign:'center'}}> Sorry No Customer Added You !</Typography>}
          

      </Item>
      </Grid>
      <Item sx={{marginTop:5}}><Button  variant="outlined" >Add New Customer</Button></Item>
    </Grid>

    <Drawer anchor={'top'} open={false} >
    <CustomerNew ref_key={info? info.referral_key:null}/>   
          </Drawer>

  </Box>
  )
}
