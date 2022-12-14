import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function InvesmentsList(props) {
    const {data,viewfun,title}=props;
    console.log(data)
    const columns = [
      {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row => row.ammount,
        sortable: true,
    },
    {
        name: 'ROI',
        selector: row => row.roi,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row =>
        <Chip label={row.status==0? "Pending" :row.status==1? "Active":row.status==2? "Withdraw":"Closed"} color={row.status==0? "primary" :row.status==1? "success":row.status==2? "warning":"error"} /> ,
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
  
    {data.length>0?  <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button>:<></>}
   
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
