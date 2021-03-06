import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DateAdapter from "@mui/lab/AdapterMoment";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MaterialTable from "material-table";
import moment from "moment";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL_CUSTOMERS } from "../../pages/routes";
import ScheduleAndPrice from "./../ScheduleAndPrice";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const CardItemHorarioCancha = ({ open, setOpen }) => {
  const history = useHistory();

  const tableRef = useRef();

  const [selection, setSelection] = useState();

  const [loading, setLoading] = useState(false);

  const [enabled, setEnabled] = useState(true);

  const [horarios, setHorarios] = useState([]);

  const [date, setDate] = useState(moment(new Date()));

  useEffect(() => {
    const newSchedule = [...horarios, ScheduleAndPrice];
    setHorarios(newSchedule);
  }, []);

  useEffect(() => {
    setEnabled(!enabled);
    /*
    if (rows.length !== 0) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
    */
  }, [selection]);

  const handleClose = () => {
    setLoading(true);

    setOpen(false);
  };

  const handleReservar = () => {
    setLoading(true);

    setOpen(false);

    history.push({
      pathname: BASE_URL_CUSTOMERS.base + "/checkout",
      state: "data sended",
    });
  };

  const handleAddNewSchedule = () => {
    const newSchedule = [...horarios, ScheduleAndPrice];
    setHorarios(newSchedule);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Cancha 1 - Horarios</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccione los horarios que desea reservar.
          </DialogContentText>

          <Box textAlign="left" sx={{ m: 4 }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                label="Fecha"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: "Horario (hs)", field: "horario" },
              { title: "Precio ($)", field: "precio" },
            ]}
            data={[
              { horario: "20 : 00", precio: 1200.0 },
              { horario: "21 : 00", precio: 1400.0 },
            ]}
            options={{
              selection: true,
              search: false,
              toolbar: false,
            }}
            //onSelectionChange={(rows) => setSelectionRows(rows)}
            onSelectionChange={(rows) => {
              setSelection(rows);
            }}
            tableRef={tableRef}
          />
        </DialogContent>

        <Box textAlign="center" sx={{ m: 2 }}>
          <LoadingButton
            color="secondary"
            onClick={handleReservar}
            loading={loading}
            loadingPosition="start"
            startIcon={<EventAvailableIcon />}
            variant="contained"
            disabled={enabled}
          >
            Reservar
          </LoadingButton>
        </Box>
      </Dialog>
    </div>
  );
};

export default CardItemHorarioCancha;
