// src/components/bcodbs/index.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  //Checkbox,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { Field, Form, Formik } from "formik";
import { alpha } from "@mui/material/styles"; 
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import NotifcationBox from "../components/NotificationBox";
import { useDispatch, useSelector } from "react-redux";
import { advSeachBcodb } from "../slices/searchSlice";
import ThirdBox from "../components/ThirdBox";
import biocomputing from "../images/biocomputing.gif"
import "../App.css";

export default function BcoDbs () {
  
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("last_update");
  const [ bcodbInfo, setBcodbInfo ] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [advancedSearch, setAdvancedSearch] = useState(false)
  
  const searchStatus = useSelector(state => state.search.status)
  const results = useSelector((state) => state.search.results)
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const bcodbs = (isLoggedIn
    ? useSelector((state) => state.account.user.bcodbs)
    : []);

  const location  = process.env.REACT_APP_SERVER_URL
  const bcodbUrl = process.env.REACT_APP_BCOAPI_URL
  const BCOAPI_TOKEN = process.env.REACT_APP_BCOAPI_TOKEN
  const publicHostname = bcodbUrl.replace("/api/", "")
  
  const isSelected = (object_id) => selected.indexOf(object_id) !== -1;

  useEffect(() => {
    if (searchStatus === "idle") {
      const data = {
        token: BCOAPI_TOKEN,
        public_hostname: publicHostname,
        search: "",
        action: "bco_id"
      }
      dispatch(advSeachBcodb(data))
    }
  },[])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results.length) : 0;

  const clickObject = (event, object_id, state) => {
    if (state === "PUBLISHED") {
      global.window.open(`${location}/viewer?${object_id}`, "_blank", "noopener,noreferrer")
    }
    if (state === "DRAFT") {
      global.window.open(`${location}/builder?${object_id}`)
    }
  }
  
  const handleSearch = () => {
    setAdvancedSearch(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = results.map((n) => n.object_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short"
    }).format(date);
  }
  
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: "object_id",
      numeric: false,
      disablePadding: true,
      label: "Object ID",
    },
    {
      id: "provenance_domain.name",
      numeric: false,
      disablePadding: false,
      label: "BCO Name",
    },
    {
      id: "prefix",
      numeric: false,
      disablePadding: false,
      label: "Prefix",
    },
    {
      id: "state",
      numeric: false,
      disablePadding: false,
      label: "Publication State",
    },
    {
      id: "score",
      numeric: false,
      disablePadding: true,
      label: "BCO Score (BETA)",
    },
    {
      id: "access_count",
      numeric: false,
      disablePadding: true,
      label: "Access Count",
    },
    {
      id: "last_update",
      numeric: false,
      disablePadding: false,
      label: "Last Update",
    },
  ];
  
  const handleClick = (event, object_id) => {
    const selectedIndex = selected.indexOf(object_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, object_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            Deafault toolbar checkbok disabled until future upgrades
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell> */}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >{results.length} BioCompute Objects returned</Typography>
        <Tooltip title="Advanced Search">
          <IconButton
            onClick={() => handleSearch()}
          >
            <FilterListIcon/>
          </IconButton>
        </Tooltip>
        
        {/* Deafault toolbar below disabled until future upgrades
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            BCODB Results
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton
              onClick={() => handleSearch()}
            >
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
        )} */}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  return (
    <Card className="table-card">
      <NotifcationBox />
      <Dialog open={advancedSearch}>
        <DialogTitle>Advanced Search</DialogTitle>
        <DialogActions>
          <Formik
            initialValues={{
              index: "None",
              action: "",
              search: ""
            }}
            // validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              if (values.index === "None") {
                const data = {
                  token: BCOAPI_TOKEN,
                  public_hostname: publicHostname,
                  search: values.search,
                  action: "bco_id"
                }
                setBcodbInfo([data.token, data.public_hostname])
                dispatch(advSeachBcodb(data))
              } else {
                const data = {
                  public_hostname: bcodbs[values.index].public_hostname,
                  token: bcodbs[values.index].token,
                  search: values.search,
                  action: values.action
                }
                setBcodbInfo([bcodbs[values.index].token, bcodbs[values.index].public_hostname])
                resetForm()
                setAdvancedSearch(false);
                dispatch(advSeachBcodb(data))
              }
              setSubmitting(false);
            }}
          >
            {({values, isSubmitting}) => (
              <Form>
                <Card>
                  <CardContent>
                    <Box>
                      <Typography>
                    1. Select from available BCODBs to display results
                      </Typography>

                      <Field as='select' name='index'>
                    (isLoggedIn
                      ? {bcodbs.map((database, index) => (
                          <option value={index} key={index}>{database.human_readable_hostname}</option>
                        ))}
                      : (<option value='None' key='None'>Public BCODB (not logged in)</option>)
                    )
                      </Field>
                    </Box>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                      2. Search Type:&nbsp;&nbsp;
                    <Field type='radio' name='action' value='mine' disabled={values.index === "None"}/>
                      &nbsp;&nbsp;My BCOs&nbsp;&nbsp;
                    <Field type='radio' name='action' value='prefix' disabled={values.index === "None"}/>
                      &nbsp;&nbsp;Prefixes&nbsp;&nbsp;
                    <Field type='radio' name='action' value='bco_id' />
                      &nbsp;&nbsp;BCO IDs&nbsp;&nbsp;
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Box maxWidth={500}>
                      <Typography>
                    3. Enter search term:
                      </Typography>
                      <Field name='search' label='Search BCO Db' />
                    </Box>
                  </CardContent>
                </Card>
                <Button onClick={() => setAdvancedSearch(false)} color="secondary">Cancel</Button>
                <Button 
                  disabled={isSubmitting || values.action === ""}
                  type='submit'
                  variant="contained"
                  color="primary"
                > Submit Search </Button>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
      <CardHeader title="BioCompute Database Search"/>
      <CardContent>
        <EnhancedTableToolbar numSelected={selected.length} />
        {searchStatus === "loading" ? (
          <ThirdBox
            title="Loading"
            image={biocomputing}
            imageAlt="loading..."
          />
        ) : (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                disabled
                onRequestSort={handleRequestSort}
                rowCount={results.length}
              />
              <TableBody>
                {(searchStatus === "loading") ?(<>loading</>) :(<></>)}
                {stableSort(results, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.object_id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        //   onClick={(event) => handleClick(event, row.object_id)}
                        disabled
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.object_id}
                        selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
                        <Tooltip title={row.owner_user} >
                          <TableCell
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Link
                              key={row.object_id}
                              onClick={(event)=>{clickObject(event, row.object_id, row.state)}}
                            >{row.object_id}</Link>
                          </TableCell>
                        </Tooltip>
                        <TableCell align="left">{row.contents.provenance_domain.name}</TableCell>
                        <TableCell align="left">{row.prefix}</TableCell>
                        <TableCell align="left">{row.state}</TableCell>
                        <TableCell align="left">{row.score}</TableCell>
                        <TableCell align="left">{row.access_count}</TableCell>
                        <TableCell align="left">{formatDate(row.last_update)}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[20, 100, 250]}
          component="div"
          count={results.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
}