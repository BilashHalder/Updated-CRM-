import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';
import {msDateToTodayDifference,calculateReturn} from 'src/util/lib'
export default function InvesmentActive(props) {
    const {data,fun,viewfun}=props;
console.log(data)
    const columns = [
      {
        name: 'Invesment Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Invesment Amount',
        selector: row => row.ammount,
        sortable: true,
    },
    {
      name: 'Account No',
      selector: row =>row.account_no,
      sortable: true,
    },
    {
      name: 'IFSC CODE',
      selector: row =>row.ifsc_code,
      sortable: true,
    },
    {
        name: 'Payble Ammount',
        selector: row =>calculateReturn(row),
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
      title={"Invesments Payout List"}
      highlightOnHover={true}
  />

    </Grid>
  )
}
