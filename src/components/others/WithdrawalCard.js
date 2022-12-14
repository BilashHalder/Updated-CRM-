import {React,useEffect,useState} from 'react';
import {Grid,Typography,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';
import axios from 'axios';
import { WalletOutline } from 'mdi-material-ui';

export default function WithdrawalCard(props) {
    const {user_id,user_type}=props.data;

    const [bankAccount, setbankAccount] = useState([]);
    const [info, setInfo] = useState(null);
    const [amount, setamount] = useState();
    const [msg, setmsg] = useState(null);
    const [account, setAccount] = useState(null)



    useEffect(() => {
        if (localStorage) {
          let info=JSON.parse(localStorage.getItem('crzn'));
          let token=info.token;
          const fd=new FormData();
          fd.append('user_type',user_type);
          fd.append('user_id',user_id);
          const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
             instance.post('account/user',fd).then((res)=>{setbankAccount(res.data)}).catch((err)=>{console.log(err)})
             instance.get(`customer/${user_id}`).then((response)=>{setInfo(response.data);console.log(response.data)}).catch(console.log)
        }
    
      }, [])




  return (
  <Grid>
    <Typography sx={{textAlign:'center',fontWeight:600}}>Withdrawal Wallet Balance to Bank Account</Typography>
   {
    info?<>    <Stack direction={'row'} sx={{marginTop:7}} spacing={6}>
    <WalletOutline></WalletOutline>
    <Typography>{parseFloat(info.balance).toFixed(2)} INR</Typography>
  </Stack></>:<></>
   }
{
    bankAccount.length?<><Stack sx={{marginTop:5}} spacing={5}>
    <FormControl fullWidth>
            <InputLabel id="account">Bank Account</InputLabel>
            <Select label="Select Bank Account"  labelId="account" value={account} onChange={(e)=>{setAccount(e.target.value)}}>
            {
                bankAccount.length<1?<MenuItem >Please Add Bank Account</MenuItem>:
                bankAccount.map((item)=>{
                  return <MenuItem value={item.account_no}>{item.account_no}  [ {item.bank} ]</MenuItem>
                })
              }
            </Select>
          </FormControl>
    <TextField label="Withdrawal Amount"  type="number"  fullWidth  InputLabelProps={{ shrink: true}}  onChange={(e)=>{setamount(e.target.value<1?0:e.target.value)}} value={amount}/>
    <Button color={'success'} sx={{marginTop:5}} variant={'outlined'} onClick={
        ()=>{
            if(amount<1 || !amount)
            setmsg("Please Enter A Valid Amount")
            else if(amount>info.balance)
            setmsg("Insufficient Balance");
            else{
                setmsg('ok');
            }
    
        }
    }>Send Withdrawal Request</Button>
    </Stack></>:<></>
}
{
    msg?<Typography color={'error'}>{msg}</Typography>:<></>
}
  </Grid>
  )
}
