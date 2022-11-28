import React,{useState} from 'react';
import {Button,Grid,Typography} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import {docUrl} from '../../util/lib'




export default function InvesmentButtons(props) {
    const {status,agreement,id,fun}=props;

   const [stat, setstat] = useState(status)
   const [msg, setMsg] = useState('')
    const withdrw=()=>{
        setstat(2)
        setMsg("Your Request Recived")
    }
   
  return (
   <Grid sx={{textAlign:'center',py:5}}>
      <ButtonGroup  >
   {
    agreement? <Button href={`${docUrl}/${agreement}`} target="_blank" color='primary' variant='outlined'>Download Agreement</Button> :<></>
   }
      {
        stat==1?<Button onClick={withdrw}>Withdraw Invesment</Button>:<></>
      }
     
    </ButtonGroup>
     {
        msg?<Typography variant='p' color="green">{msg}</Typography>:<></>
      }
   </Grid>
  )
}
