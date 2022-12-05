


import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = `withdrawalrequest${new Date()}}`
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';
import {msDateToTodayDifference} from 'src/util/lib'
export default function WithdrawalRequest(props) {
    const {data,fun,viewfun}=props;
    console.log(data);

    const columns = [
      {
        name: 'User Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'User Type',
        selector: row => <span>{row.user_type==1?"Customer":"Associate"}</span>,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
    },
    {
      name: 'Account No',
      selector: row =>row.account,
      sortable: true,
    },
    {
        name: 'IFSC CODE',
        selector: row =>row.ifsc_code,
        sortable: true,
    },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{ viewfun(row) }}>View</Button>
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
  
  <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button>
   
  <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      fixedHeader={true}
      fixedHeaderScrollHeight={'400px'}
      title={"Withdrawal Request List"}
      highlightOnHover={true}
  />

    </Grid>
  )
}

