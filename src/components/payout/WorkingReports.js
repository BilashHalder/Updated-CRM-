import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function WorkingReports(props) {
    const {data,editfun,viewfun,title}=props
    const columns = [
      {
        name: 'Report Date',
        selector: row => row.report_date.slice(0,10),
        sortable: true,
    },
    {
        name: 'Log In Time',
        selector: row => row.start_time,
        sortable: true,
    },
    {
        name: 'Log Out Time',
        selector: row => row.submit_time,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row =>
        <Chip label={row.status==2? "Pending" :row.status==1? "Accepted":row.status==0? "Rejected":"Submitted"} color={row.status==2? "primary" :row.status==1? "success":row.status==3? "warning":"error"} /> ,
        sortable: true,
    },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" >View</Button>
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
  
  {/* <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button>
    */}
  <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      fixedHeader={true}
      fixedHeaderScrollHeight={'400px'}
      title={title}
      highlightOnHover={true}

  />

    </Grid>
  )
}
