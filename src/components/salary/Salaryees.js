import { React, useState } from "react";
import { Grid, ButtonGroup, Button} from "@mui/material";
import exportFromJSON from "export-from-json";
const fileName = "salaryList";
const exportType = exportFromJSON.types.csv;
import DataTable from "react-data-table-component";

export default function Salaryees(props) {
  const { data, editfun, viewfun } = props;
  const columns = [
    {
      name: "Basic",
      selector: (row) => row.basic,
      sortable: true,
    },
    {
      name: "Hra",
      selector: (row) => row.hra,
      sortable: true,
    },
    {
      name: "Conveyance",
      selector: (row) => row.conveyance,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        parseFloat(row.hra) +
        parseFloat(row.basic) +
        parseFloat(row.conveyance) +
        parseFloat(row.medical) +
        parseFloat(row.special) +
        parseFloat(row.pf) +
        parseFloat(row.insurance),
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
          <Button
            color="warning"
            onClick={() => {
              editfun(row);
            }}
          >
            Edit
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
      <Button
        onClick={() => {
          exportFromJSON({ data, fileName, exportType });
        }}
      >
        Download CSV
      </Button>

      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive
        fixedHeader={true}
        fixedHeaderScrollHeight={"400px"}
        title="All Salary List"
        highlightOnHover={true}
      />
    </Grid>
  );
}
