import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

//api for crud
import axios from 'axios';
import { USER_DB_URL } from 'utils/db/ApiUrl';

//material ui
import { useTheme, styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridRowEditStopReasons, GridRowModes, GridActionsCellItem } from '@mui/x-data-grid';

//assets
import { IconPlus, IconCheck, IconX, IconPencil, IconTrash } from '@tabler/icons-react';

//component imports
import MainCard from 'components/UI/Cards/MainCard';
import Skeleton from 'components/UI/Cards/Skeleton/EarningCard';
import { gridSpacing } from 'redux/constant';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative'
}));

const UserManager = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [setRows]);

  const fetchData = async () => {
    await axios
      .get(USER_DB_URL)
      .then((response) => {
        if (response.data) {
          setRows(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: 'id', headerName: 'UID', minWidth: 20, maxWidth: 50, type: 'number', editable: false, flex: 5 },
    { field: 'username', headerName: 'Username', minWidth: 125, type: 'string', editable: true, flex: 10 },
    { field: 'nik', headerName: 'NIK', minWidth: 175, maxWidth: 220, type: 'string', editable: true, flex: 10 },
    { field: 'nama', headerName: 'Full Name', minWidth: 150, type: 'string', editable: true, flex: 15 },
    { field: 'email', headerName: 'Email', minWidth: 150, type: 'string', editable: true, flex: 15 },
    { field: 'telp', headerName: 'Phone No.', minWidth: 130, type: 'string', editable: true, flex: 10 },
    { field: 'kota', headerName: 'City', minWidth: 13, type: 'string', editable: true, flex: 10 },
    { field: 'alamat', headerName: 'Address', minWidth: 200, type: 'string', editable: true, flex: 20 },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 5,
      minWidth: 62,
      maxWidth: 100,
      type: 'singleSelect',
      editable: true,
      valueOptions: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
        { value: 'X', label: 'Other' },
        { value: '', label: 'Unassigned' }
      ]
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      flex: 5,
      type: 'actions',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<IconCheck />}
              label="Save"
              sx={{
                color: theme.palette.success.main
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<IconX />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="tertiary"
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<IconPencil stroke={1.5} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            sx={{
              borderRadius: '12px',
              backgroundColor: theme.palette.warning.main,
              color: '#fff',
              '&:hover': { backgroundColor: theme.palette.warning.dark }
            }}
          />,
          <GridActionsCellItem
            key={id}
            icon={<IconTrash stroke={1.5} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{
              borderRadius: '12px',
              backgroundColor: theme.palette.error.main,
              color: '#fff',
              '&:hover': { backgroundColor: theme.palette.error.dark }
            }}
          />
        ];
      }
    }
  ];

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <CardWrapper>
            <Grid container spacing={gridSpacing}>
              <Dialog open={formOpen} onClose={handleCloseForm}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates occasionally.
                  </DialogContentText>
                  <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseForm}>Cancel</Button>
                  <Button onClick={handleCloseForm}>Subscribe</Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={12}>
                <Typography variant="h3" color={theme.palette.tertiary.main}>
                  Manage Users
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenForm}
                      sx={{ borderRadius: '12px', color: theme.palette.background.paper, py: 1.25, px: 2.25 }}
                    >
                      <IconPlus />
                      <Typography variant="button" sx={{ ml: 1 }}>
                        add user
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  sx={{ borderRadius: '12px' }}
                ></DataGrid>
              </Grid>
            </Grid>
          </CardWrapper>
        )}
      </Grid>
    </Grid>
  );
};

export default UserManager;
