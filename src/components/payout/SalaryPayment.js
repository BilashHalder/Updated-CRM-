
import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';
import {msDateToTodayDifference} from 'src/util/lib'
export default function SalaryPayment(props) {
    const {data,fun,viewfun}=props;
    // console.log(data)

    const columns = [
      {
        name: 'Employee Id',
        selector: row => row.employee_id,
        sortable: true,
    },
    {
        name: 'Date of Joining',
        selector: row => row.joining_date.slice(0,10),
        sortable: true,
    },
    {
        name: 'Last Salary Pay',
        selector: row => row.last_payment.slice(0,10),
        sortable: true,
    },
    // {
    //   name: 'Days',
    //   selector: row =>msDateToTodayDifference(row.last_payment),
    //   sortable: true,
    // },
    // {
    //     name: 'Payble Ammount',
    //     selector: row =>9000,
    //     sortable: true,
    // },
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
      title={"Salary List"}
      highlightOnHover={true}
  />

    </Grid>
  )
}
