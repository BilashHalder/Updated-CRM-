import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function Withdrawals(props) {
    const {data}=props
    const columns = [
      {
        name: 'Withdrawal Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
    },
    {
        name: 'Account No',
        selector: row => row.account,
        sortable: true,
    },
    {
        name: 'Ifsc Code',
        selector: row => row.ifsc_code,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row =>
        <Chip label={row.status==0? "Pending" :row.status==1? "Success":"Cancel"} color={row.status==0? "primary" :row.status==1? "success":row.status==2? "warning":"error"} /> ,
        sortable: true,
    },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{ console.log(row) }}>Download</Button>
          </ButtonGroup>
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
      title={'Withdrwal Request History'}
      highlightOnHover={true}

  />

    </Grid>
  )
}
