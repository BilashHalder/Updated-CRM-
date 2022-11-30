import {React,useState} from 'react'
import {Grid,ButtonGroup,Button,Drawer} from '@mui/material';
import exportFromJSON from 'export-from-json';
const fileName = 'invesmentlist'
const exportType =  exportFromJSON.types.csv;


import { styled } from '@mui/material/styles';
import {Paper} from '@mui/material'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
import DataTable from 'react-data-table-component';
import InvesmentInfo from './InvesmentInfo';
import InvesmentEdit from './InvesmentEdit';
// import InvesmentView from './InvesmentView';




export default function InvesmentList(props) {
  const {data,title}=props;
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
            selector: row =><span>{row.status==0? "Pending" :row.status==1? "Active":row.status==2? "Withdraw":"Closed"}</span> ,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row =><ButtonGroup variant="text">
            <Button  color="info" onClick={()=>{viewData(row)}}>View</Button>
            <Button  color="warning" onClick={()=>{editData(row)}}>Edit</Button>
          </ButtonGroup>
        },
    ];

   

    const closeView=()=>{
        setEditDrawer(false);
    }

    const closeEdit=()=>{
        setViewDrawer(false);
    }


    const editData=(single)=>{
        setItem(single)
        setEditDrawer(true);
    }

    const viewData=(single)=>{
        setItem(single)
        setViewDrawer(true);
    }

    const [viewDrawer, setViewDrawer] = useState(false);
    const [editDrawer, setEditDrawer] = useState(false);
    const [item, setItem] = useState(null);


    const tableData={
        columns,
        data,
      }
  return (
    <Grid container sx={{'textAlign':'center!important','display':'block','my':'2%','fontFamily':'Playfair Display!important'}}>
  
 <Item>
 <Button onClick={()=>{exportFromJSON({ data, fileName, exportType })}}>Download CSV</Button>
   
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

   <Drawer anchor={'top'}open={viewDrawer} onClose={closeEdit} >
      <InvesmentInfo data={item}/>
   </Drawer>

   <Drawer anchor={'top'}open={editDrawer} onClose={closeView} >
      {/* <InvesmentInfo data={item}/> */}
      <InvesmentEdit data={item}  fun={props.fun}/>
   </Drawer>

 </Item>

    </Grid>
  )
}

