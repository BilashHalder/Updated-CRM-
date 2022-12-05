import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Avatar,Drawer} from '@mui/material';
import {imageUrl} from 'src/util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'associateList'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

export default function Leaves(props) {
    const {data,editfun,viewfun}=props
    const columns = [
      {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Annual',
        selector: row => row.annual,
        sortable: true,
    },
    {
      name: 'Casual',
      selector: row => row.casual,
      sortable: true,
  },
  {
    name: 'Sick',
    selector: row => row.id,
    sortable: true,
},
{
    name: 'Total',
    selector: row =>(parseInt( row.annual)+parseInt( row.casual)+parseInt( row.sick)+parseInt( row.maternity)+parseInt( row.bereavement)+parseInt( row.others)),
    sortable: true,
    },
    
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{ viewfun(row) }}>View</Button>
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
  
  <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button>
   
         <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
            fixedHeader={true}
            fixedHeaderScrollHeight={'400px'}
            title="Leave List"
            highlightOnHover={true}

        />

    </Grid>
  )
}
