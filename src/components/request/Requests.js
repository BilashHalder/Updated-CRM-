import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function Requests(props) {
    const {data,viewfun,title}=props
    const columns = [
      {
        name: 'Requset Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
  },
  {
    name: 'Phone',
    selector: row =>row.phone,
    sortable: true,
    },
    {
      name: 'Status',
      selector: row =><Chip label={row.status==0?"Pending":"Resolved"} color={row.status==0?"info":"success"}/>,
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
