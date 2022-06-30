import React, { forwardRef, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import MaterialTable from "material-table";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { courtList } from "../../assets/mocks/courtList";
import FormularioHorarioPrecioCancha from "../../components/formularios-datos/FormularioHorarioPrecioCancha";
import CanchaService from "../../services/canchas/CanchaService";
import DeporteService from "../../services/deportes/DeporteService";
import PhotoService from "../../services/photos/PhotoService";
import CourtsDetails from "./CourtsDetails";
import UploadImage from "./../../components/UploadImage";
import UploadPhotos from "../../components/ui/UploadPhotos";
import InstitucionService from "../../services/instituciones/InstitucionService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
  },
}));

const getSurfaces = (sport) => {
  return surfacesArray.filter((s) => sport.id === s.sport_id);
};

const surfacesArray = [
  {
    sport_id: "61a68dbc107957730042e154",
    surface: [
      {
        id: 0,
        name: "Polvo de Ladrillo",
      },
      {
        id: 1,
        name: "Cemento",
      },
      {
        id: 2,
        name: "Césped",
      },
    ],
  },
  {
    sport_id: "61a68dbc107957730042e153",
    surface: [
      {
        id: 0,
        name: "Césped Sintetico",
      },
      {
        id: 1,
        name: "Cesped Natural",
      },
      {
        id: 2,
        name: "Alfombra",
      },
      {
        id: 3,
        name: "Cemento",
      },
    ],
  },
  {
    sport_id: "61a68dbc107957730042e155",
    surface: [
      {
        id: 0,
        name: "Césped Artificial",
      },
      {
        id: 1,
        name: "Cemento",
      },
      {
        id: 2,
        name: "Hormigón Poroso",
      },
      {
        id: 3,
        name: "Recubrimiento Sintético",
      },
    ],
  },
];

const InputImage = styled("input")({
  display: "none",
});

const ListaCanchas = ({ institutionId }) => {
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
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const institution = useSelector((state) => state.institution);

  const history = useHistory();

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
  });

  const [sportArray, setSportArray] = useState([]);

  const [openUploadPhotos, setOpenUploadPhotos] = useState(false);

  const [enableSelectSurface, setEnableSelectSurface] = useState(false);

  const [isMultipleEdit, setIsMultipleEdit] = useState(false);

  const [enableButtons, setEnableButtons] = useState(true);

  const [sportSelected, setSportSelected] = useState({});

  const [data, setData] = useState([]);

  const [photoData, setPhotoData] = useState([]);

  const [images, setImages] = useState([]);

  const [fileObjects, setFileObjects] = useState([]);

  const [horariosYPrecios, setHorariosYPrecios] = useState({
    excluirDiasNoLaborales: true,
  });

  const [sport, setSport] = useState({});

  const [surfaces, setSurfaces] = useState([]);

  const [switchState, setSwitchState] = useState(false);

  const handleSwitchChange = (oldRow, e) => {
    const changeData = { [e.target.name]: e.target.checked };
    const newRow = { ...oldRow, ...changeData };

    console.log("habilitando cancha");
    console.log(changeData);
    console.log(oldRow);
    console.log(newRow);
  };

  const handleSelectedSport = (sport_id) => {
    console.log("handleSelectedSport");
    console.log(sport_id);
  };

  const columns = [
    {
      title: "Deporte",
      field: "sport",
      validate: (rowData) =>
        rowData.sport === undefined
          ? {
              isValid: false,
              helperText: "Debe seleccionar un deporte para la cancha",
            }
          : true,
      lookup: sport,
      render: (rowData) => rowData.sport.name,
      editComponent: (rowData) => {
        return (
          <Select
            value={rowData.value || "string"}
            onChange={(e) => {
              rowData.onChange(String(e.target.value));
              setSportSelected(e.target.value);
            }}
          >
            {sportArray.map((type) => (
              <MenuItem value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Nombre Cancha",
      field: "name",
      validate: (rowData) =>
        rowData.name === undefined || rowData.name === ""
          ? {
              isValid: false,
              helperText: "El nombre de la cancha no puede estar vacio",
            }
          : true,
    },
    {
      title: "Superficie",
      field: "surface",
      validate: (rowData) =>
        rowData.sport === undefined
          ? {
              isValid: false,
              helperText: "Debe seleccionar la Superficie de la Cancha",
            }
          : true,
      //lookup: (rowData) => getSurfaces(rowData.sport),
      lookup: surfaces,
      render: (rowData) => rowData.surface,
    },
    { title: "Descripcion", field: "description" },
    {
      title: "Seña",
      field: "signPercentage",
      type: "numeric",
      render: (rowData) =>
        rowData.signPercentage === undefined || rowData.signPercentage === 0
          ? "no requiere seña"
          : "% " + rowData.signPercentage,
      editComponent: (props) => (
        <TextField
          id="standard-start-adornment"
          type="number"
          size="small"
          value={props.value}
          helperText={
            props.value < 0 || props.value > 100
              ? "La Seña debe ser entre 0 y 100"
              : ""
          }
          onChange={(e) => props.onChange(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          variant="standard"
        />
      ),
    },
    {
      title: "Estado",
      field: "enabled",
      render: (rowData) => (rowData.enabled ? "Habilidata" : "Deshabilitada"),
      editComponent: (props) => (
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          }
          label={props.value ? "Habilitada" : "Deshabilitada"}
        />
      ),
    },
    {
      title: "Techada",
      field: "techada",
      render: (rowData) => (rowData.enabled ? "Techada" : "Descubierta"),
      editComponent: (props) => (
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          }
          label={props.value ? "Techada" : "Descubierta"}
        />
      ),
    },
    {
      title: "Iluminacion",
      field: "iluminacion",
      render: (rowData) => (rowData.enabled ? "Si" : "No"),
      editComponent: (props) => (
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
            />
          }
          label={props.value ? "Si" : "No"}
        />
      ),
    },
    {
      field: "schedule",
      filtering: false,
      editComponent: (props) => (
        <Button color="info" variant="contained" onClick={desplegarModal}>
          Agregar Horarios y Precios
        </Button>
      ),
    },
    {
      field: "images",
      filtering: false,
      editComponent: (props) => (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setOpenUploadPhotos(true);
          }}
        >
          <PhotoCamera />
        </IconButton>
      ),
    },
  ];

  const handleUploadImage = (e) => {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImages([...images, ...ImagesArray]);
    console.log("images", images);
  };

  const retrieveSportsList = async () => {
    try {
      const listadoDeportes = await DeporteService.getAll();

      console.log("listadoDeportes");
      console.log(listadoDeportes);

      const data = listadoDeportes.data;

      if (data) {
        const sport = {};
        data.map((s) => (sport[s.id] = s.name));

        console.log(sport);

        setSport(sport);
        setSportArray(data);
      }
    } catch (err) {
      //history.push("/login");
    }
  };

  const desplegarModal = (props) => {
    setIsMultipleEdit(false);
    setOpen(true);
  };

  const desplegarModalForMultipleEdit = (props) => {
    setIsMultipleEdit(true);
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const createCancha = async (newCancha) => {
    console.log("newCancha");
    console.log(newCancha);

    let cancha = newCancha;

    if (horariosYPrecios.schedules) {
      const horarios = horariosYPrecios.schedules.map((s) =>
        s
          ? {
              ...s,
              ["from"]: moment(s.from).format("HH:mm"),
              ["to"]: moment(s.to).format("HH:mm"),
            }
          : s
      );
      horariosYPrecios.schedules = horarios;

      cancha = { ...newCancha, ["schedule"]: horariosYPrecios };
    } else {
      console.log("no hay horarios cargados");
    }
    console.log(cancha);

    try {
      const canchaCreated = await CanchaService.create(institution.id, cancha);

      const data = canchaCreated.data;

      for (let i = 0; i < images.selectedFiles.length; i++) {
        const photoAdded = await PhotoService.upload(
          data.id,
          images.selectedFiles[i]
        );

        console.log("photoAdded");
        console.log(photoAdded);

        setPhotoData((photos) => [
          ...photos,
          {
            img: photoAdded.data,
            title: "Breakfast",
            author: "@bkristastucchio",
            featured: true,
          },
        ]);
      }

      console.log("cancha creada");
      console.log(canchaCreated);
      console.log(data);
      return data;
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  const updateCancha = async (canchaToUpdated) => {
    console.log("canchaToUpdated");

    const cancha = { ...canchaToUpdated, ["schedule"]: horariosYPrecios };

    console.log(cancha);

    const canchaUpdated = await CanchaService.update(institution.id, cancha);
    const data = canchaUpdated.data;

    console.log("cancha actualizada");
    console.log(canchaUpdated);
    console.log(data);
    return data;
  };

  const deleteCancha = async (id) => {
    const canchaCreated = await CanchaService.remove(institution.id, id);
    const data = canchaCreated.data;
    return data;
  };

  const retrieveCourts = async (institutionId) => {
    try {
      const listadoCanchas = await CanchaService.getAll(institutionId);

      console.log("listadoCanchas");
      console.log(listadoCanchas);

      const data = listadoCanchas.data;

      if (data) {
        data.forEach((court) => {
          console.log("obteniendo imagenes");
          console.log(court);

          if (court.images_id !== null) {
            let photos = [];

            court.images_id.forEach((image_id) => {
              photos.push({
                img: "http://localhost:8080/api/photos/" + image_id,
                title: "Breakfast",
                author: "@bkristastucchio",
                featured: true,
              });
            });

            console.log("array de photos");
            console.log(photos);

            court.photos = photos;
          } else {
          }
        });

        console.log("final data");
        console.log(data);

        setData(data);
      }
    } catch (err) {
      //history.push("/login");
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log("sportArray");
    console.log(sportArray);
    console.log("sportSelected");
    console.log(sportSelected);

    const surfacesArrayFiltered = sportArray.filter(
      (s) => s.id == sportSelected
    );

    if (surfacesArrayFiltered.length > 0) {
      /* const dynamicLookupSurfaces = sportArray.surfaces.reduce(function (
        acc,
        cur,
        i
      ) {
        acc[cur.id] = cur.name;

        return acc;
      },
      {}); */

      const dynamicLookupSurfaces = surfacesArray[0].surface.reduce(function (
        acc,
        cur,
        i
      ) {
        acc[cur.id] = cur.name;

        return acc;
      },
      {});

      setSurfaces(dynamicLookupSurfaces);
    } else {
      console.log("no hay superficies cargadas");
    }
  }, [sportSelected]);

  useEffect(() => {
    //DEVOLVER LAS CANCHAS DE LA INSTITUCION
    retrieveCourts(institution.id);

    //SETEAR LOS DEPORTES DISPONIBLES
    retrieveSportsList();

    const dynamicLookupObject = sportArray.reduce(function (acc, cur, i) {
      acc[cur.id] = cur.name;

      return acc;
    }, {});

    console.log(dynamicLookupObject);

    //setSport(dynamicLookupObject);
    //setData(courtList);
  }, []);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Listado de Canchas"
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "canchas",
            nextTooltip: "Proxima Pagina",
            previousTooltip: "Pagina Previa",
            firstTooltip: "Primer Pagina",
            lastTooltip: "Ultima Pagina",
          },
          toolbar: {
            nRowsSelected: "{0} cancha(s) seleccionada(s)",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar Cancha",
          },
          header: {
            actions: "Opciones",
          },
          body: {
            addTooltip: "Agregar Nueva Cancha",
            editTooltip: "Editar Cancha",
            deleteTooltip: "Eliminar Cancha",
            emptyDataSourceMessage:
              "Aun no existen canchas asociadas a la institucion",
            filterRow: {
              filterTooltip: "Filter",
            },
            editRow: {
              saveTooltip: "Confirmar",
              cancelTooltip: "Cancelar",
              deleteText: "Esta seguro que desea Eliminar esta Cancha?",
            },
          },
          grouping: {
            placeholder: "Arrastre los encabezados aquí para agruparlos",
          },
        }}
        columns={columns}
        data={data}
        options={{
          selection: true,
          grouping: true,
          filtering: true,
        }}
        detailPanel={[
          {
            tooltip: "Mostrar Imagenes",
            render: (rowData) => <CourtsDetails rowData={rowData} />,
          },
        ]}
        actions={[
          {
            tooltip: "Eliminar todas las canchas seleccionadas",
            icon: Delete,
            onClick: (evt, data) =>
              alert("Quieres eliminar " + data.length + " Canchas"),
          },
          {
            tooltip: "Editar Horarios",
            icon: Edit,
            onClick: (evt, data) => desplegarModalForMultipleEdit(),
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              const cancha = await createCancha(newData)
                .then((cancha) => {
                  console.log("agregar cancha a la lista");
                  console.log(cancha);

                  setData([...data, cancha]);

                  setOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Cancha creada Exitosamente!",
                  });

                  resolve();
                })
                .catch((err) => {
                  console.log("error al agregar cancha a la lista");
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              const cancha = await updateCancha(newData);

              console.log("actualizar cancha");
              console.log(cancha);

              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = cancha;
              setData([...dataUpdate]);

              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              console.log("eliminando cancha");
              console.log(oldData);

              const cancha = await deleteCancha(oldData.id);

              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }),
        }}
      />
      {openUploadPhotos && (
        <UploadPhotos
          openUploadPhotos={openUploadPhotos}
          setOpenUploadPhotos={setOpenUploadPhotos}
          setImages={setImages}
          images={images}
          isMultipleEdit={isMultipleEdit}
          handleUploadImage={handleUploadImage}
          fileObjects={fileObjects}
          setFileObjects={setFileObjects}
          filesLimit={6}
          isModal={true}
        />
      )}
      {open && (
        <FormularioHorarioPrecioCancha
          open={open}
          setOpen={setOpen}
          horariosYPrecios={horariosYPrecios}
          setHorariosYPrecios={setHorariosYPrecios}
          isMultipleEdit={isMultipleEdit}
        />
      )}
      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openSnackbar.open}
            onClose={handleCloseSnackbar}
          >
            <Alert
              severity={openSnackbar.severity}
              onClose={handleCloseSnackbar}
              sx={{ width: "100%" }}
            >
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </>
  );
};

export default ListaCanchas;
