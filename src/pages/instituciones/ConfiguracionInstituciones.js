import React, { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AdvancePaymentConfig from "../../components/settings/AdvancePaymentConfig";
import { InstitutionDetails } from "../../components/settings/InstitutionDetails";
import { NonWorkingDays } from "../../components/settings/NonWorkingDays";
import { OpenAndCloseTimes } from "../../components/settings/OpenAndCloseTimes";
import { Holidays } from "../../components/settings/Holidays";
import { ImagesSection } from "../../components/settings/ImagesSection";
import InstitucionService from "../../services/instituciones/InstitucionService";
import { ConfirmProvider } from 'material-ui-confirm';

const reducer = (state, action) => {
  console.log("action", action.data);
  console.log("state", state);
  switch (action.type) {
    case "schedules":
      return { ...state, schedules: action.data };
    default:
      return state;
  }
};

const ConfiguracionInstituciones = () => {
  /* const [state, dispatch] = useReducer(reducer, {
    schedules: [],
  }); */

  const dispatch = useDispatch();

  const configuration = useSelector((state) => state.configuration);

  const handleChanges = () => {
    console.log("actualizando datos de la institucion")

    try {

      const instititionDetails = InstitucionService.update()
        .then((data) => data);



    } catch (error) {

    }

  }

  useEffect(() => {
    //Obtener detalles de la institucion

    try {

      const instititionDetails = InstitucionService.get("62a655985154182a24d057c8")
        .then((data) => data);



    } catch (error) {

    }

  }, []);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 2,
              pb: 8,
            }}
          >
            <Container
              sx={{
                margin: 0,
              }}
              maxWidth="lg"
            >
              <Typography sx={{ mb: 3 }} variant="h4">
                <InstitutionDetails />
              </Typography>

              <Box sx={{ pt: 3 }}>
                <ImagesSection />
              </Box>
              <Box sx={{ pt: 3 }}>
                <NonWorkingDays />
              </Box>
              <Box sx={{ pt: 3 }}>
                <Holidays />
              </Box>
              <Box sx={{ pt: 3 }}>
                <ConfirmProvider>
                  <OpenAndCloseTimes />
                </ConfirmProvider>
              </Box>
              <Box sx={{ pt: 3 }}>
                <AdvancePaymentConfig />
              </Box>
            </Container>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ConfiguracionInstituciones;
