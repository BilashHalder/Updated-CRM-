import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Drawer,Chip} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'depositlist'
const exportType =  exportFromJSON.types.csv;
import DataTable from 'react-data-table-component';

//`id`, `employee_id`, ``, ``, ``, ``, ``, `application_time`
export default function LeaveHistory(props) {
    const {data,fun}=props;
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
        },
        {
            name: 'From Date',
            selector: row => row.from_date.slice(0,10),
            sortable: true,
        },
        {
          name: 'To Date',
          selector: row => row.to_date.slice(0,10),
          sortable: true,
      },
        {
            name: 'Total Days',
            selector: row =>row.total_days,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => <Chip label={row.status==0?"Pending":row.status==1?"Sucessfull":"Rejected"} color={row.status==0?"primary":row.status==1?"success":"error"} size={'small'}></Chip>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{viewData(row)}}>View</Button>
          </ButtonGroup>
        },
    ];


    const closeEdit=()=>{
        setViewDrawer(false);
    }

    const viewData=(single)=>{
        setViewDrawer(true);
        setViewData(single);
    }
const [viewdata, setViewData] = useState(null);
    const [viewDrawer, setViewDrawer] = useState(false);

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
      title="Leave History"
      highlightOnHover={true}

  />

   <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
      {/* <DepositView data={viewdata?viewdata:null}/> */}
   </Drawer>


    </Grid>
  )
}
