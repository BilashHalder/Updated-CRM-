// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider from '@mui/material/Divider'
import axios from 'axios';

import {useState,useEffect} from 'react'


// Styled Divider component
const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const DepositWithdraw = (props) => {
  const {user_id,user_type}=props;

  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      url: `http://localhost:9000/api/payment/user`,
      data: {user_id,user_type},
    })
      .then((response)=> {
        setTransaction(response.data)
      })
      .catch((err)=> {
       console.log(err);
      });
  }, [])
  



  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Deposit'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {transaction.map((item, index) => {
           if(item.to_account=='creazione' && index<5){
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== transaction.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <img src={'/images/logos/gumroad.png'} alt={item.id} width={30} height={30} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                    <Typography variant='caption'>{item.to_account.toUpperCase()}</Typography>
                  </Box>
                  <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
                    {`₹ `+item.ammount}
                  </Typography>
                </Box>
              </Box>
            )
           }
          })}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Withdraw'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          
          {transaction.map((item, index) => {
            if(item.from_account=='creazione'){
              return (
                <Box
                  key={item.title}
                  sx={{ display: 'flex', alignItems: 'center', mb: index !== transaction.length - 1 ? 6 : 0 }}
                >
                  <Box sx={{ minWidth: 36, display: 'flex', justifyContent: 'center' }}>
                    <img src={'/images/logos/citi-bank.png'} alt={item.id} width={30} height={30} />
                  </Box>
                  <Box
                    sx={{
                      ml: 4,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                      <Typography variant='caption'>{item.transaction_time.slice(0,10)}</Typography>
                    </Box>
                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'error.main' }}>
                    {`₹ `+item.ammount}
                    </Typography>
                  </Box>
                </Box>
              )
            }
          
          })}
        </CardContent>
      </Box>
    </Card>
  )
}

export default DepositWithdraw
