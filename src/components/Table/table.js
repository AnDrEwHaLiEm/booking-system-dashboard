import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
// Icons
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import CustomTableRow from "./CustomTableRow";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputLabel, NativeSelect } from "@mui/material";



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

export default function EnhancedTable(props) {
  const {
    withSearch = false,
    withEdit = false,
    initialRows,
    headCells,
    path,
    handleDeleteAPI,
  } = props;


  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState([]);
  const [searchElement, setSearchElement] = useState("");

  const handleDelete = async (index) => {
    const splices_rows = [...rows];
    await handleDeleteAPI([splices_rows[index]._id])
      .then((res) => {
        console.log(res);
        splices_rows.splice(index, 1);
        setRows(splices_rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setRows(initialRows);
    setSearchElement(headCells[headCells.length - 1].id);
  }, [initialRows, headCells]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function handleClick(event, _id) {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  ////////////////// search logic ////////////////////////

  const requestSearch = (searchedVal) => {
    const filteredRows = initialRows.filter((row) => {
      return row[searchElement]
        .toString()
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {initialRows.length > 0 && withSearch && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TextField
              onChange={(e) => requestSearch(e.target.value)}
              sx={{ width: "80%" }}
              id="input-with-sx"
              label="بحث"
              variant="standard"
            />
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <Box>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                search by
              </InputLabel>
              <NativeSelect
                onChange={(e) => setSearchElement(e.target.value)}
                defaultValue={searchElement}
              >
                {headCells.map(
                  ({ id, label , type}) =>
                    id !== "edit" && (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    )

                   
                )}
              </NativeSelect>
            </Box>
          </Box>
        )}
        <EnhancedTableToolbar handleDelete={handleDelete} selected={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, padding: 0 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              headCells={headCells}
              withEdit={withEdit}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <CustomTableRow
                      index={index}
                      path={path}
                      handleDelete={handleDelete}
                      key={labelId}
                      row={row}
                      cellsInTheRightOrder={headCells}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    </CustomTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200, 250, 300]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
