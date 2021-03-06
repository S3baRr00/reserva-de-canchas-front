import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  Fragment,
} from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
//import { TextField } from "@material-ui/core";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AuthService from "../../services/auth.service";
import AppAppBar from "../home/modules/views/AppAppBar";
import { Link, useHistory } from "react-router-dom";
import InstitucionService from "../../services/instituciones/InstitucionService";
import GeoLocalizacionService from "../../services/geolocalizacion/GeoLocalizacionService";
import ComboBox from "../../components/ui/ComboBox";
import AlertMessageComponent from "../../components/ui/AlertMessageComponent";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import EmailService from "../../services/email/EmailService";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import es from "react-phone-input-2/lang/es.json";
import ar from "react-phone-input-2/lang/ar.json";

const themeTextArea = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        multiline: {
          fontWeight: "bold",
          fontSize: "20px",
          color: "purple",
          width: "50vw",
        },
      },
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ?? "}
      <Link color="inherit" href="#">
        RESERVA TU CANCHA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUpInstitution = () => {
  let history = useHistory();

  const theme = useTheme();

  const [showMessageError, setShowMessageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState({
    name: "",
    address: {
      geometry: {
        x: "",
        y: "",
      },
      langAddress: "",
    },
    institutionTel: "",
    description: "",
    firstName: "",
    lastName: "",
    userRole: "ROLE_ADMIN",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    firstName: "",
    lastName: "",
    userRole: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    telephone: "",
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setShowMessageError(false);
  };

  const handleOnChange = (value) => {
    console.log("Actualizando numero de telefono");
    console.log("[institutionTel]: " + value);

    setErrors((prevState) => {
      return {
        ...prevState,
        institutionTel: validate("institutionTel", value),
      };
    });
    setValues((prevState) => {
      return {
        ...prevState,
        institutionTel: value,
      };
    });
  };

  const handleMessageError = (message) => {
    setErrorMessage(message);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          return "Nombre de la Instituci??n es Requerido";
        } else {
          return "";
        }
      case "firstName":
        if (!value || value.trim() === "") {
          return "Nombre es Requerido";
        } else {
          return "";
        }
      case "lastName":
        if (!value || value.trim() === "") {
          return "Apellido es Requerido";
        } else {
          return "";
        }
      case "email":
        if (!value) {
          return "Email es Requerido";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Introduzca una direcci??n de correo electr??nico v??lida";
        } else {
          return "";
        }
      case "institutionTel":
        if (!value || value.trim() === "") {
          return "N??mero de Telefono es Requerido";
        } else if (!value.match(/^[6-9]\d{9}$/)) {
          return "Introduce un n??mero de Tel??fono v??lido.";
        } else {
          return "";
        }
      case "description":
        if (!value || value.trim() === "") {
          return "La Descripci??n de la Instituci??n es Requerida";
        } else {
          return "";
        }
      case "password":
        if (!value) {
          return "La Contrase??a es Requerida";
        } else if (value.length < 6) {
          return "Por favor complete con al menos 6 caracteres";
        } else if (!value.match(/[a-z]/g)) {
          return "Por favor, Ingrese al menos una min??scula.";
        } else if (!value.match(/[A-Z]/g)) {
          return "Por favor, Ingrese al menos una may??scula.";
        } else if (!value.match(/[0-9]/g)) {
          return "Por favor, Ingrese al menos valor num??rico.";
        } else if (!value.match(/[!@#&:;'.,?_/*~$^=<>\(\)???\[\{}\]\+]/g)) {
          return "Por favor, Ingrese al menos un caracter especial.";
        } else {
          return "";
        }
      case "confirmPassword":
        if (!value) {
          return "Confirmar Contrase??a es requerido";
        } else if (value !== values.password) {
          return "Nueva contrase??a y Confirmar Contrase??a deben ser Iguales";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleUserInput = (e) => {
    console.log("SETEANDO VALORES A");
    console.log(
      "[e.target.name]: " +
        e.target.name +
        " [e.target.value]: " +
        [e.target.value]
    );

    setErrors((prevState) => {
      return {
        ...prevState,
        [e.target.name]: validate(e.target.name, e.target.value),
      };
    });
    setValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("creando admin e institucion");
    console.log(values);

    try {
      const adminUser = await AuthService.register(
        values.firstName,
        values.lastName,
        values.userRole,
        values.email,
        values.password,
        values.institutionTel
      ).then((data) => data);

      //pegarle al endpoint email

      const emailSended = await EmailService.sendVerificationEmail(
        adminUser.email
      ).then((data) => data);

      const managers = [adminUser.email];

      const { name, description, institutionTel, address } = values;

      const data = {
        name,
        description,
        institutionTel,
        address,
        managers,
      };

      console.log("enviando datos de la institucion");
      console.log(data);

      const institution = await InstitucionService.create(data).then(
        (data) => data
      );

      console.log("INSTITUCION CREADA");
      console.log(institution);

      history.push({
        pathname: "/account-confirmation",
        state: values,
      });
    } catch (err) {
      console.error("error al crear admin e institucion");
      console.error(err);

      if (err.data === undefined || err.data === null) {
        handleMessageError(
          Object.values(err).map((error, idx) => (
            <Fragment key={error}>
              {<br />}
              {error}
              {<br />}
            </Fragment>
          ))
        );
      } else {
        handleMessageError(
          Object.values(err.data).map((error, idx) => (
            <Fragment key={error}>
              {<br />}
              {error}
              {<br />}
            </Fragment>
          ))
        );
      }

      setShowMessageError(true);
    }
  };

  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registra tu Club
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Box>
                <Box display="flex">
                  <Box flex={1} mr="1em">
                    <Typography variant="h6" gutterBottom>
                      Institucion
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          value={values.name}
                          id="name"
                          label="Nombre de la Institucion"
                          name="name"
                          autoComplete="Nombre de la Institucion"
                          onChange={handleUserInput}
                          onBlur={handleUserInput}
                          helperText={errors.name}
                          error={errors.name}
                        />
                      </Grid>
                    </Grid>

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Direccion
                    </Typography>

                    <ComboBox
                      autoComplete="given-name"
                      name="address"
                      required
                      fullWidth
                      id="address"
                      label="Direccion de la Institucion"
                      values={values}
                      setValues={setValues}
                      helperText={errors.address}
                      error={errors.address}
                    />

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Telefono Institucion
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <PhoneInput
                          inputStyle={{
                            width: "100%",
                            height: "54px",
                            fontSize: "18px",
                            paddingLeft: "48px",
                            borderRadius: "5px",
                          }}
                          localization={es}
                          country="ar"
                          enableAreaCodes={["ar"]}
                          enableAreaCodeStretch={true}
                          onlyCountries={["ar"]}
                          masks={{ ar: "(..) ....-...." }}
                          onChange={handleOnChange}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ m: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Descripcion
                    </Typography>

                    <ThemeProvider theme={themeTextArea}>
                      <TextField
                        autoComplete="given-name"
                        multiline
                        rows={5}
                        name="description"
                        value={values.description}
                        required
                        variant="outlined"
                        fullWidth
                        id="description"
                        label="Dejanos una breve descripcion de la Institucion"
                        onChange={handleUserInput}
                        onBlur={handleUserInput}
                        helperText={errors.description}
                        error={errors.description}
                      />
                    </ThemeProvider>
                  </Box>

                  <Box flex={1} ml="1em">
                    <Box display="flex">
                      <Box flex={2} mr="1em">
                        <Typography variant="h6" gutterBottom>
                          Administrador
                        </Typography>
                        <Box>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                autoComplete="given-name"
                                name="firstName"
                                value={values.firstName}
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                onChange={handleUserInput}
                                onBlur={handleUserInput}
                                helperText={errors.firstName}
                                error={errors.firstName}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                value={values.lastName}
                                autoComplete="family-name"
                                onChange={handleUserInput}
                                onBlur={handleUserInput}
                                helperText={errors.lastName}
                                error={errors.lastName}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <PhoneInput
                                inputStyle={{
                                  width: "100%",
                                  height: "54px",
                                  fontSize: "18px",
                                  paddingLeft: "48px",
                                  borderRadius: "5px",
                                }}
                                placeholder="+54 (11) 1234-1234"
                                value={values.telephone}
                                localization={ar}
                                country="ar"
                                enableAreaCodes={["ar"]}
                                enableAreaCodeStretch={true}
                                onlyCountries={["ar"]}
                                preferredCountries={["ar"]}
                                preserveOrder={[
                                  "onlyCountries",
                                  "preferredCountries",
                                ]}
                                masks={{ ar: "(..) ....-...." }}
                                onChange={handleOnChange}
                                isValid={(value, country) => {
                                  if (errors.telephone !== "") {
                                    return (
                                      "Numero Invalido: " +
                                      value +
                                      ", " +
                                      country.name
                                    );
                                  } else {
                                    return true;
                                  }
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Correo Electronico"
                                name="email"
                                value={values.email}
                                autoComplete="email"
                                onChange={handleUserInput}
                                onBlur={handleUserInput}
                                helperText={errors.email}
                                error={errors.email}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={errors.password}
                                fullWidth
                                variant="outlined"
                              >
                                <InputLabel
                                  required
                                  htmlFor="outlined-adornment-password"
                                >
                                  Contrase??a
                                </InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={
                                    values.showPassword ? "text" : "password"
                                  }
                                  value={values.password}
                                  onChange={handleUserInput}
                                  onBlur={handleUserInput}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {values.showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Contrase??a"
                                  name="password"
                                />
                                <FormHelperText>
                                  {errors.password}
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                error={errors.confirmPassword}
                                fullWidth
                                variant="outlined"
                              >
                                <InputLabel
                                  required
                                  htmlFor="outlined-adornment-password"
                                >
                                  Confirmar Contrase??a
                                </InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={
                                    values.showConfirmPassword
                                      ? "text"
                                      : "password"
                                  }
                                  value={values.confirmPassword}
                                  onChange={handleUserInput}
                                  onBlur={handleUserInput}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {values.showConfirmPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Confirmar Contrase??a"
                                  name="confirmPassword"
                                />
                                <FormHelperText>
                                  {errors.confirmPassword}
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Toolbar>
                <TextField
                  name="role"
                  id="role"
                  value="ROLE_ADMIN"
                  type="hidden"
                />
                <Box
                  sx={{ padding: 0 }}
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  <LoadingButton
                    fullWidth
                    color="secondary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    type="submit"
                  >
                    Registrar Institucion
                  </LoadingButton>
                </Box>
              </Toolbar>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Ya tenes una Cuenta? Inicia Sesion
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>

      <AlertMessageComponent
        showMessageError={showMessageError}
        handleClose={handleClose}
        errorMessage={errorMessage}
      />
    </React.Fragment>
  );
};

export default SignUpInstitution;
