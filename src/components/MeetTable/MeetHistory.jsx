import React from 'react';
import { styled } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import { sortMeetData, formatDate, formatPlaces, formatTime } from '../../utils/utils';

const columns = [
  { id: 'sno', label: 'S.No', minWidth: 70 },
  { id: 'date', label: 'Date', minWidth: 134, align: 'right' },
  {
    id: 'fromTime',
    label: 'From',
    minWidth: 130,
    align: 'right',
  },
  {
    id: 'toTime',
    label: 'To',
    minWidth: 130,
    align: 'right',
  },
  {
    id: 'places',
    label: 'Places',
    minWidth: 170,
    align: 'right',
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D3D3D3',
    //color: theme.palette.common.white,
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles((theme) => createStyles({
  selectLabel: {
    marginTop: '16px'
  }
}));

const MeetHistory = ({meetData}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box>
      <p className="foodHeading">   
       Meeting History 
      </p>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={6}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortMeetData(meetData)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row">{row.sno}</TableCell>
                      <TableCell align="right">{formatDate(row.date, 'Do MMM, YYYY')}</TableCell>
                      <TableCell align="right">{formatTime(row.fromTime)}</TableCell>
                      <TableCell align="right">{formatTime(row.toTime)}</TableCell>
                      <TableCell align="right">{formatPlaces(row.places)}</TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={meetData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          classes={{selectLabel: classes.selectLabel, displayedRows: classes.selectLabel}}
        />
      </Paper>
    </Box>
  )
}

export default MeetHistory;