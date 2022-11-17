// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import CardAccountMail from 'mdi-material-ui/CardAccountMail'
import CashClock from 'mdi-material-ui/CashCheck'
import EmailOpenMultipleOutline from 'mdi-material-ui/EmailOpenMultipleOutline'

// ** Demo Tabs Imports
import TableBasic from 'src/views/tables/TableBasic'
import AppointmentLetter from '../../../components/others/AppointmentLetter';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Others = () => {
  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailOpenMultipleOutline />
                <TabName>Appointment Letter </TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardAccountMail />
                <TabName>Joining Letter</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CashClock />
                <TabName>Salary Payment</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <AppointmentLetter/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TableBasic />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TableBasic />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Others;
