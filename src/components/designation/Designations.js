import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import {imageUrl} from 'src/util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function Designations(props) {
    const {data,editfun}=props
    const columns = [
      {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button color="warning" onClick={()=>{editfun(row)}}>Edit</Button>
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
            title="All Designation"
            highlightOnHover={true}

        />

    </Grid>
  )
}
