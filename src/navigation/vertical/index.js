// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import {CubeOutline,HomeOutline,CurrencyInr,AccountGroup,AccountCashOutline,AccountChild,BookOpen,BriefcaseOutline,CashFast,BankTransfer} from 'mdi-material-ui'




const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Employee',
      icon: AccountChild,
      path: '/employee'
    },
    {
      title: 'Customer',
      icon: AccountGroup,
      path: '/customer'
    },
    {
      title: 'Associate',
      path: '/associate',
      icon: AccountCashOutline
    },
    {
      title: 'Invesment',
      icon: BookOpen,
      path: '/invesment'
    },
    {
      title: 'Payout',
      icon: CurrencyInr,
      path: '/tables'
    },
    {
      icon: BriefcaseOutline,
      title: 'Designation',
      path: '/designation'
    },
    {
      icon: CashFast,
      title: 'Salary',
      path: '/salary'
    },
    {
      icon: BankTransfer,
      title: 'Deposit',
      path: '/deposit'
    },
    {
      icon: CubeOutline,
      title: 'All Request',
      path: '/request'
    },
    {
      icon: CubeOutline,
      title: 'Others',
      path: '/others'
    }
  ]
}

export default navigation
