import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from '../../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface Item {
  _id: string;
  location: string;
  budget: number;
}

export default function SiteList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [site, setSite] = React.useState([]);
  const navigate = useNavigate();

  let authPayload = React.useContext(AuthContext);
  const { fromStorage }: any = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;

  const headers = { Authorization: 'Bearer ' + token };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/site/getSites',
          { headers },
        );
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          setSite(res);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handelProps = (id: any, location: any) => {
    navigate(`/manager/orders/${location}/${id}`);
  };

  return (
    <Box
      sx={{
        paddingTop: 10,
        paddingBottom: 10,
        width: 'auto',
        paddingLeft: '100px',
        paddingRight: '100px',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key="name" align="left" style={{ minWidth: '50' }}>
                  Site Name
                </TableCell>
                <TableCell key="budget" align="left" style={{ minWidth: '50' }}>
                  Budgect
                </TableCell>
                <TableCell key="view" align="left" style={{ minWidth: '50' }}>
                  view
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {site
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item: Item) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item._id}
                    >
                      <TableCell align="left">{item.location}</TableCell>
                      <TableCell align="left">{item.budget}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() => handelProps(item._id, item.location)}
                        >
                          <VisibilityIcon style={{ color: 'orange' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={site.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
