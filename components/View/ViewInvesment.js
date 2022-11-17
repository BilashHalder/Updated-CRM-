import {React,useState,useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link'
import {baseUrl,imageUrl} from '../../util/lib';
import {Grid,Typography,TableContainer,Table,TableBody,TableRow,TableCell,Box,Button,Stack,Select,MenuItem,FormControl,InputLabel,Switch,FormControlLabel,TextField,Avatar,Divider,Alert,Snackbar,Paper,CircularProgress,Drawer} from '@mui/material';


export default function ViewInvesment(props) {
const {id,user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,date_time, agreement_file,status,withdrw_req_time,is_send}=props.data;
const [account, setAccount] = useState(null);
const [nominee, setNominee] = useState(null);



useEffect(() => {
  axios({
    method: "get",
    url: `${baseUrl}/nominee/${nominee_id}`,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response)=> {
      console.log(response.data)
      setNominee(response.data)
    })
    .catch((err)=> {
     console.log(err);
    });
}, [])



  return (
    <Box>
      <Typography variant="h5" component="h5" sx={{'textAlign':'center','marginBottom':'2%'}} >Invesment Information </Typography>
      <Grid container spacing={3}>

      <Grid item md={6}>
      <Typography variant="h6" component="h6" sx={{'textAlign':'center'}} >Invesment Details </Typography>
      <Divider/>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Invesment Id</TableCell> <TableCell>{id}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Ammount</TableCell> <TableCell>{ammount}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Invesment Date & Time</TableCell> <TableCell>{date_time.replace('T'," ").replace(".000Z","")}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Return </TableCell> <TableCell>{roi} % </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Status </TableCell> <TableCell>{status==0?"Pending":status==1?"Active":status==2?"withdraw Requested":"Close"} </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Send By Post </TableCell> <TableCell>{is_send==0?"No":"Yes"} </TableCell>
            </TableRow>
            {withdrw_req_time?<TableRow>
            <TableCell>Withdrw Request Time </TableCell> <TableCell>{withdrw_req_time.replace('T'," ").replace(".000Z","")} </TableCell>
            </TableRow>:<></>}

          </TableBody>
        </Table>
      </TableContainer>
  
      </Grid>

      <Grid item md={6}>
      <Typography variant="h6" component="h6" sx={{'textAlign':'center','marginBottom':'2%'}} >Nominee & Bank Details </Typography>
      <Divider/>
      <TableContainer >
        <Table>
          {nominee?<TableBody>
            <TableRow>
              <TableCell>Nominee Name</TableCell> <TableCell>{nominee.name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Date Of Birth</TableCell> <TableCell>{nominee.dob.slice(0,10)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bank Account No</TableCell> <TableCell>{account_no}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Status</TableCell> <TableCell>{is_send==0?"Not Active":"Active"} </TableCell>
            </TableRow>

          </TableBody>:<></>}
          
        </Table>
      </TableContainer>
     
    <Box sx={{'m':"4%"}}>
    <Button> <Link  style={{"textDecoration":"none"}}href="/invesment?id=4">View More Information</Link></Button>
    </Box>
      </Grid>
    </Grid>
    </Box>
  )
}
