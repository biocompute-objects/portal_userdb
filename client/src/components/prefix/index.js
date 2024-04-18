import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationBox from "../NotificationBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { searchPrefixRegistry } from "../../slices/prefixSlice";
import { Typography } from "@material-ui/core";
import { Container } from "react-bootstrap";
import PrefixRegister from "./prefixRegister";
import "../../App.css"
import PrefixModify from "./PrefixModify";

export default function PrefixRegistry() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const currentUser = isLoggedIn 
    ? useSelector((state) => state.account.user.userinfo.username) 
    : "AnonymousUser";
  const rows = useSelector((state) => state.prefix.data);

  useEffect(() => {
    dispatch(searchPrefixRegistry(["all", "None"]));
  }, [dispatch]);

  return (
    <Paper>
      <Typography variant='h4'>BioCompute Object Prefix Registry</Typography>
      <NotificationBox />
      <PrefixRegister isLoggedIn={isLoggedIn}/>
      <Container className="custom-container">
        <TableContainer component={Paper} className="custom-table-container">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Prefix</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right">Registration Date</TableCell>
                <TableCell align="right">Admin Privileges</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.prefix}
                  </TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.registration_date}</TableCell>
                  <TableCell align="right">
                    {row.username === currentUser ? (
                      <PrefixModify prefix={row} />
                    ) : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Paper>
  );
}
