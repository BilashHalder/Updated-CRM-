// ** React Imports
import { useState,useEffect } from 'react'
import axios from 'axios'

import {Box,Chip,Button, Divider,Grid,List,ListItem,ListItemAvatar,Avatar,ListItemText ,Select,MenuItem,TextField,Typography,InputLabel,AlertTitle,CardContent,FormControl} from '@mui/material'

import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

import EmailIcon from '@mui/icons-material/Email';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import TagIcon from '@mui/icons-material/Tag';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import WcIcon from '@mui/icons-material/Wc';






const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const UserAccount = (props) => {
  const [customer, setcustomer] = useState(null)
  const {user_id}=props;

useEffect(() => {
 
  axios({
    method: "get",
    url: `http://localhost:9000/api/customer/${user_id}`,
  })
    .then((response)=> {
      setcustomer(response.data)
    })
    .catch((err)=> {
     console.log(err);
    });
 
}, [])

 
  

  return (
    <CardContent>
     {
      customer? <Box>
      <Grid container spacing={4}>
        
        <Grid item xs={6} md={4} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={`http://localhost:9000/uploads/images/${customer.image}`} alt={customer.name} />
          </Box>
        </Grid>


        <Grid item xs={6} sm={6} md={4}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={customer.email}  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <SettingsCellIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={customer.phone}  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
           <TagIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={customer.referral_key} secondary="Referral Id" />
      </ListItem>
    </List>

        </Grid>

        <Grid item xs={6} sm={6} md={4}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountBalanceWalletIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`₹  ${parseFloat(customer.balance)}`}  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <StarBorderIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={customer.status==0?"Deactive":customer.status==1?"Active":"Others"}  sx={{color:'red'}} secondary='Status'/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
           <WcIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={customer.gender==1?"Male":customer.gender==2?"Female":"Others"}  />
      </ListItem>
    </List>
        </Grid>
  
      </Grid>
    </Box>:<></>
     }
    </CardContent>
  )
}

export default UserAccount
