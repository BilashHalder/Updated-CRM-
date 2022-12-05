import { React, useState } from "react";
import { Grid, ButtonGroup, Button, Chip } from "@mui/material";
import exportFromJSON from "export-from-json";
const fileName = "associateList";
const exportType = exportFromJSON.types.csv;
import DataTable from "react-data-table-component";

export default function LeaveRequests(props) {
  const { data, viewfun, title } = props;
  const columns = [
    {
      name: "Employee Id",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "Leave Type",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.from_date.slice(0, 10),
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.to_date.slice(0, 10),
      sortable: true,
    },
    {
      name: "Total Days",
      selector: (row) => row.total_days,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          {" "}
          <Chip
            label={
              row.status == 0
                ? "Pending"
                : row.status == 1
                ? "Accepted"
                : "Rejected"
            }
            color={
              row.status == 0
                ? "primary"
                : row.status == 1
                ? "success"
                : "error"
            }
          />{" "}
        </>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <ButtonGroup variant="text">
          <Button
            color="info"
            onClick={() => {
              viewfun(row);
            }}
          >
            View
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  const [viewData, setviewData] = useState(null);

  const tableData = {
    columns,
    data,
  };
  return (
    <Grid
      container
      sx={{
        textAlign: "center!important",
        display: "block",
        my: "2%",
        fontFamily: "Playfair Display!important",
      }}
    >
      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive
        fixedHeader={true}
        fixedHeaderScrollHeight={"400px"}
        title={title}
        highlightOnHover={true}
      />
    </Grid>
  );
}
