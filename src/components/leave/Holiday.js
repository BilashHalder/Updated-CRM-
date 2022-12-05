import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  Box,
  Snackbar,
  Alert,
  Stack,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";




import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Holidays() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [showEdit, setshowEdit] = useState(false);



  useEffect(() => {
    if (localStorage) {
      let info = JSON.parse(localStorage.getItem("crzn"));
      let token = info.token;
      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      instance
        .get("holidays")
        .then((res) => setData(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [flag]);

  const [message, setMessage] = useState("This is a success alert — check it out!");
  const [alertShow, setAlertShow] = useState(false);
  const [alertColor, setaAertColor] = useState("error");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [id, setid] = useState(null);
  const snackClose = () => {
    setAlertShow(false);
  };

  const formHandler = (e) => {
    e.preventDefault();
    let regName = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    var q = new Date();
    var today = new Date(q.getFullYear(), q.getMonth(), q.getDate());
    var inpdate = new Date(dob);

    if (!regName.test(name)) {
      setAlertShow(true);
      setMessage("Please Enter a Festival Name!");
      setaAertColor("error");
    } else if (today > inpdate) {
      setAlertShow(true);
      setMessage("Invalid Festival Date!");
      setaAertColor("error");
    } else {
      let data = new FormData();
      data.append("title", name);
      data.append("h_date", dob);

      let token = JSON.parse(localStorage.getItem("crzn")).token;

      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      instance
        .post("holidays", data)
        .then((response) => {
          setAlertShow(true);
          setMessage("Holidays Information Saved");
          setaAertColor("success");
          resetForm();
          setFlag(Math.random());
        })
        .catch((response) => {
          setAlertShow(true);
          setMessage("Please Try Again Later!");
          setaAertColor("error");
        });
    }
  };

  const resetForm = () => {
    setName("");
    setDob("");
  };


  const showEditFrom=(row)=>{
    setid(row.id);
    setName(row.title);
    setDob(row.h_date.slice(0,10));
    setshowEdit(true);
  }


const updateformHandler=(e)=>{
    e.preventDefault();
    let regName = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    var q = new Date();
    var today = new Date(q.getFullYear(), q.getMonth(), q.getDate());
    var inpdate = new Date(dob);

    if (!regName.test(name)) {
      setAlertShow(true);
      setMessage("Please Enter a Festival Name!");
      setaAertColor("error");
    } else if (today > inpdate) {
      setAlertShow(true);
      setMessage("Invalid Festival Date!");
      setaAertColor("error");
    } else {
      let data = new FormData();
      data.append("title", name);
      data.append("h_date", dob);

      let token = JSON.parse(localStorage.getItem("crzn")).token;

      const instance = axios.create({
        baseURL: "http://localhost:9000/api/",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      instance
        .put(`holidays/${id}`, data)
        .then((response) => {
          setAlertShow(true);
          setMessage("Holidays Information Saved");
          setaAertColor("success");
          resetForm();
          setFlag(Math.random());
          setshowEdit(false);
        })
        .catch((response) => {
          setAlertShow(true);
          setMessage("Please Try Again Later!");
          setaAertColor("error");
        });
    }
}

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        {showEdit ? (
          <>
            <Typography sx={{ textAlign: "center",m:5 }}>Edit Holiday</Typography>
            <Box component="form" onSubmit={updateformHandler}>
              <Grid container spacing={2} direction="row">
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Festival Name"
                    type="text"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Date Of Festival"
                    type="date"
                    required
                    fullWidth
                    value={dob}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Stack direction="row" spacing={4} sx={{ py: "3%", px: "4%" }}>
                    <Button variant="outlined" type={"submit"} color="warning">
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <Box component="form" onSubmit={formHandler}>
            <Typography sx={{ textAlign: "center", marginBottom: 5 }}>
              Add New Holiday
            </Typography>
            <Grid container spacing={2} direction="row">
              <Grid item md={4} xs={12}>
                <TextField
                  label="Festival Name"
                  type="text"
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Date Of Festival"
                  type="date"
                  required
                  fullWidth
                  value={dob}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Stack direction="row" spacing={4} sx={{ py: "3%", px: "4%" }}>
                  <Button variant="outlined" type={"submit"} color="success">
                    Save
                  </Button>
                  <Button variant="outlined" color="error" onClick={resetForm}>
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>

      <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 5 }}>
        <Typography sx={{ textAlign: "center" }}>
          Upcoming Holidays List
        </Typography>
        {data.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Festival Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">
                        {row.h_date.slice(0, 10)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size={"small"}
                          color="warning"
                          onClick={(eve) => {
                          showEditFrom(row);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography variant="h6" component="h6" sx={{ textAlign: "center" }}>
            {" "}
            No Holidays Information Added!
          </Typography>
        )}
      </Grid>
      <Snackbar open={alertShow} autoHideDuration={2000} onClose={snackClose}>
        <Alert severity={alertColor}>{message}</Alert>
      </Snackbar>
    </Grid>
  );
}
