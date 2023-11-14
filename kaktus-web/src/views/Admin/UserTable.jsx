import PropTypes from 'prop-types';
import { useState } from 'react';

//material ui
import { useTheme, styled } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid, GridRowEditStopReasons, GridRowModes, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import { IconPlus, IconCheck, IconX, IconPencil, IconTrash } from '@tabler/icons-react';

import MainCard from 'components/UI/Cards/MainCard';
import Skeleton from 'components/UI/Cards/Skeleton/EarningCard';
import { gridSpacing } from 'redux/constant';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative'
}));

const sampleData = [
  {
    id: 1,
    nik: '00000000000000000000',
    nama: 'Test User 1',
    email: 'testUser1@kaktus.com',
    telp: '08251798287',
    username: 'testUser1',
    kota: 'Jakarta',
    alamat: 'jl.xxx No.89, xxx, xxx, indonesia',
    gender: 'M'
  },
  {
    id: 2,
    nik: '0000000000000001',
    nama: 'Test User 2',
    email: 'testUser2@kaktus.com',
    telp: '086720919231',
    username: 'testUser2',
    kota: 'Jakarta',
    alamat: 'jl.xxx No.89, xxx, xxx, indonesia',
    gender: 'F'
  },
  {
    id: 3,
    nik: '102398417298',
    nama: 'Test User 3',
    email: 'testUser3@kaktus.com',
    telp: '08562819930',
    username: 'testUser3',
    kota: 'Bandung',
    alamat: 'jl.xxx No.89, xxx, xxx, indonesia',
    gender: 'M'
  }
];

const EditToolbar = (props) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 4;
    setRows((oldRows) => [
      ...oldRows,
      { id, nik: '', nama: '', email: '', telp: '', username: '', kota: '', alamat: '', gender: '', isNew: true }
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nik' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="success" startIcon={<IconPlus />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
};

const UserTable = ({ isLoading }) => {
  const theme = useTheme();

  const [rows, setRows] = useState(sampleData);
  const [rowModesModel, setRowModesModel] = useState({});

  const columns = [
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
      flex: 7,
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
      flex: 8,
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
            icon={<IconPencil />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="secondary"
          />,
          <GridActionsCellItem key={id} icon={<IconTrash />} label="Delete" onClick={handleDeleteClick(id)} color="tertiary" />
        ];
      }
    }
  ];

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
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <CardWrapper>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h3" color={theme.palette.tertiary.main}>
                Manage Users
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                checkboxSelection
                disableRowSelectionOnClick
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                  toolbar: EditToolbar
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel }
                }}
              ></DataGrid>
            </Grid>
          </Grid>
        </CardWrapper>
      )}
    </>
  );
};

UserTable.propTypes = {
  isLoading: PropTypes.bool
};

EditToolbar.propTypes = {
  setRows: PropTypes.any,
  setRowModesModel: PropTypes.any
};

export default UserTable;
