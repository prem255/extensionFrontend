import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRowId,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Avatar, MenuItem, Select } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
export default function DataTable() {
  const [tableData, setTableData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [deleteFlag, setDeleteFlag] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const updateSelectedIds = (newSelectedIds: GridRowId[]) => {
    const stringIds = newSelectedIds.map((id) => id.toString());
    setSelectedIds(stringIds);
  };

  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const handleCloseDropdown = () => {
    setOpenDropdown(null); // Close the dropdown
  };

  const handleOpenDropdown = (field: string) => {
    setOpenDropdown(field); // Open the dropdown for the specified field
  };
  const renderCellspc = (params: GridCellParams) => {
    const handleSelectChange = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      console.log("Selected value:", event.target.value);
    };
    console.log(params.value);

    return (
      <Select
        value={params.value || ""}
        //@ts-ignore
        onChange={handleSelectChange}
        onClick={() => handleOpenDropdown(params.field)}
        onClose={handleCloseDropdown}
        open={openDropdown === params.field}
      >
        {/* @ts-ignore */}
        {params.value?.split(",").map((spec: string, index: number) => (
          <MenuItem key={index} value={spec}>
            {spec}
          </MenuItem>
        ))}
      </Select>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "img",
      headerName: "Logo",
      width: 80,
      renderCell: (params: GridCellParams) => (
        <Avatar alt={params.value as string} src={params.value as string} />
      ),
    },
    { field: "name", headerName: "Company Name", width: 100 },
    { field: "website", headerName: "Website", width: 100 },
    { field: "category", headerName: "Industry", width: 100 },
    { field: "hq", headerName: "Headquarters", width: 100 },
    { field: "founded", headerName: "Founded" },
    { field: "emp", headerName: "Employee" },
    { field: "desc", headerName: "Overview" },
  ];

  const url = "http://localhost:8000/api/v1/company/";
  function CustomToolbar() {
    console.log(selectedIds, selectedIds.length);
    return (
      <GridToolbarContainer>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          disabled={selectedIds.length === 0 ? true : false}
        >
          Delete
        </Button>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}?page=${currentPage}`);
      const data = result.data.data.map((i: any) => ({ ...i, id: i._id }));
      setTotalCount(result.data.total);
      setTableData(data);
    };
    fetchData();
  }, [currentPage, deleteFlag]);
  
  const handleDelete = async () => {
    if (selectedIds.length < 0) return;
    try {
      await axios.post(`${url}/delete`, { ids: selectedIds });
      setDeleteFlag((prev) => (prev === 0 ? 1 : 0));
      setSelectedIds([]);
    } catch (e) {}
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        rowCount={totalCount}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        slots={{
          toolbar: CustomToolbar,
        }}
        // keepNonExistentRowsSelected
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = Array.from(new Set(ids));
          updateSelectedIds(selectedIDs);
        }}
      />
    </div>
  );
}
