import { React, useState, useEffect, use } from 'react'
import { Grid, ButtonGroup, Button, Avatar, Drawer, Stack } from '@mui/material';
import axios from 'axios';
import { baseUrl, imageUrl, downloadCSV } from '../../../util/lib';
import exportFromJSON from 'export-from-json';
const fileName = 'download'
const exportType = exportFromJSON.types.csv;

import DataTable from 'react-data-table-component';
import EmployeeView from './EmployeeView';
import EmployeeEdit from './EmployeeEdit';


export default function EmployeeAll(props) {
    const { data, fun } = props;
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => <Stack direction={'column'}><Avatar alt={row.name} src={`${imageUrl}/${row.image}`} /> {row.name}</Stack>,
        },
        {
            name: 'Phone No',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => <span>{row.status == 0 ? "Not Active" : row.status == 1 ? "Active" : "Others"}</span>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <ButtonGroup variant="text">
                <Button color="info" onClick={() => { viewData(row) }}>View</Button>
                <Button color="warning" onClick={() => { editData(row) }}>Edit</Button>
            </ButtonGroup>
        },
    ];



    const closeView = () => {
        setEditDrawer(false);
    }

    const closeEdit = () => {
        setViewDrawer(false);
    }


    const editData = (single) => {
        setId(single);
        setEditDrawer(true);
    }

    const viewData = (single) => {
        setId(single);
        setViewDrawer(true);
    }


    const [editDrawer, setEditDrawer] = useState(false);
    const [viewDrawer, setViewDrawer] = useState(false);
    const [id, setId] = useState(null);

    const tableData = {
        columns,
        data,
    }
    return (
        <Grid container sx={{ 'textAlign': 'center!important', 'display': 'block', 'my': '2%', 'fontFamily': 'Playfair Display!important' }}>

            <Button onClick={() => { exportFromJSON({ data, fileName, exportType }) }}>Download CSV</Button>

            <DataTable
                columns={columns}
                data={data}
                pagination
                responsive
                fixedHeader={true}
                fixedHeaderScrollHeight={'400px'}
                title="All Employees"
                highlightOnHover={true}

            />

            <Drawer anchor={'top'} open={editDrawer} onClose={closeView} >
                <EmployeeEdit data={id} fun={fun} />
            </Drawer>
            <Drawer anchor={'top'} open={viewDrawer} onClose={closeEdit} >
                <EmployeeView data={id} fun={fun} />
            </Drawer>
        </Grid>
    )
}
