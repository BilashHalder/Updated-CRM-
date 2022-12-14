import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'depositList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function DepositList(props) {
    const {data}=props
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
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
            name: 'Payment Type',
            selector: row =><span>{row.mode==1?"Bank Deposit":row.mode==2?"UPI/IMPS":"Others"}</span> ,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => <Chip label={row.status==0?"Pending":row.status==1?"Sucessfull":"Rejected"} color={row.status==0?"primary":row.status==1?"success":"error"} size={'small'}></Chip>,
        },
    ];

    const [viewData, setviewData] = useState(null);


    const tableData={
        columns,
        data,
      }
  return (
    <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}}>
  
         <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
            fixedHeader={true}
            fixedHeaderScrollHeight={'400px'}
            title={'Deposit History'}
            highlightOnHover={true}

        />

    </Grid>
  )
}
