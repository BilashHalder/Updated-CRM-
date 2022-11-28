import {React,useState,useEffect} from 'react'
import {Grid,ButtonGroup,Button,Drawer,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'payouts'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';
import DepositView from './DepositView';
import {baseUrl,Item} from '../../util/lib';
import axios from 'axios';


export default function UserPayouts(props) {
    const {user_id,user_type}=props;
    const [payouts, setPayouts] = useState([])

    useEffect(() => {
        if (localStorage) {
          let info=JSON.parse(localStorage.getItem('crzn'));
          let token=info.token;
          let data=new FormData();
          data.append('user_id',user_id);
          data.append('user_type',user_type);
    
          const instance = axios.create({
            baseURL: 'http://localhost:9000/api/',
            headers: {
                        'Authorization': 'Bearer '+token,
                        "Content-Type": "multipart/form-data"
                     }
          });
             instance.post('payout/user',data).then((res)=>setPayouts(res.data)).catch((err)=>{console.log(err.response.data)});

        }
       
      }, [])

//`id`, `invesment_id`, `account_no`, `ifsc_code`, `amount`, `date_time`, `user_id`, `user_type`, `transaction_id`, `status`

    const columns = [
        {
            name: 'Payout Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Invesment Id',
            selector: row => row.invesment_id,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
        },
        {
            name: 'Date & Time',
            selector: row => row.date_time.replace('T',' ').replace('.000Z',''),
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => <Chip label={row.status==0?"Pending":row.status==1?"Sucessfull":"Rejected"} color={row.status==0?"primary":row.status==1?"success":"error"} size={'small'}></Chip>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{viewData(row)}}>Download</Button>
          </ButtonGroup>
        },
    ];


    const closeEdit=()=>{
        setViewDrawer(false);
    }

    const viewData=(single)=>{
        setViewDrawer(true);
        setViewData(single);
    }
const [viewdata, setViewData] = useState(null);
    const [viewDrawer, setViewDrawer] = useState(false);

    const tableData={
        columns,
        payouts,
      }
  return (
    <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}}>
  
    <Item>
  
   <DataTable
      columns={columns}
      data={payouts}
      pagination
      responsive
      fixedHeader={true}
      fixedHeaderScrollHeight={'400px'}
      title="Payout History"
      highlightOnHover={true}

  />

   <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
      <DepositView data={viewdata?viewdata:null}/>
   </Drawer>
    </Item>

    </Grid>
  )
}
