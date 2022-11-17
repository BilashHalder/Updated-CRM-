import React from 'react'
import {Grid,Typography,Box,Button,Stack,TextField,Alert,Snackbar,List,ListItem,ListItemText,Divider,TableContainer,Table,TableCell,TableRow,Paper,TableBody  } from '@mui/material';
export default function ViewSalary(props) {
  const {basic,hra,conveyance,special,medical,pf,insurance,tax,id}=props.data;
  let total=basic+hra+conveyance+special+medical+pf+insurance+tax;
  let deduct=+pf+insurance+tax;


  return (
   <Box>
     <Typography align={'center'} variant={'h5'} sx={{'my':'1%'}}>Salary Information</Typography>
    <Grid container spacing={3}>
        <Grid item md={6} xs={12} sx={{'p':'5%'}}>
       

        <List>
          {
            basic? <><ListItem alignItems={'center'}>Basic<ListItemText>  ₹ {basic} </ListItemText> </ListItem> <Divider/></>:<></>
          } 
           {
            hra? <><ListItem><ListItemText>HRA  ₹ {hra} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            conveyance? <><ListItem><ListItemText>Conveyance  ₹ {conveyance} </ListItemText> </ListItem> <Divider/></>:<></>
          }
        
           {
            special? <><ListItem><ListItemText>Special  ₹ {special} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            total? <><ListItem><ListItemText>CTC Per Month   </ListItemText> </ListItem> <Divider/></>:<></>
          }
          {
            deduct? <><ListItem><ListItemText>Insurance +  PF +  Tax   </ListItemText> </ListItem> <Divider/></>:<></>
          }  

          {
            deduct? <><ListItem><ListItemText>Total Salary   </ListItemText> </ListItem> <Divider/></>:<></>
          } 

          </List>

      </Grid >
      <Grid item md={6} xs={6} sx={{'p':'5%'}}>
        <List>
        
           {
            medical? <><ListItem><ListItemText>Medical  ₹ {medical} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            pf? <><ListItem><ListItemText>PF  ₹ {pf} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            insurance? <><ListItem><ListItemText>Insurance  ₹ {insurance} </ListItemText> </ListItem> <Divider/></>:<></>
          }
           {
            tax? <><ListItem><ListItemText>Tax  ₹ {tax} </ListItemText> </ListItem> <Divider/></>:<></>
          }

        {
            total? <><ListItem><ListItemText>  ₹ {total} </ListItemText> </ListItem> <Divider/></>:<></>
          }
          {
            deduct? <><ListItem><ListItemText>  ₹ {deduct} </ListItemText> </ListItem> <Divider/></>:<></>
          }  

          {
            deduct? <><ListItem><ListItemText>  ₹ {total-deduct} </ListItemText> </ListItem> <Divider/></>:<></>
          } 

          </List>

      </Grid >
    </Grid>
   </Box>
  )
}
