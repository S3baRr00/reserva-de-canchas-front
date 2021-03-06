import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import ReservationCalendar from "../../components/ReservationCalendar";
import ColumnGroupingTable from "./ColumnGroupingTable";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ListaReserva = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 8">
            <Item>RESERVAS</Item>
          </Box>
          <Box gridColumn="span 4">
            <Item>xs=4</Item>
          </Box>
          <Box gridColumn="span 5">
            <Item>
              <ReservationCalendar />
            </Item>
          </Box>
          <Box gridColumn="span 7">
            <Item>xs=7</Item>
          </Box>
          <Box gridColumn="span 12">
            <Item>
              <TabContext value={value}>
                <Box
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="FUTBOL" value="1" />
                    <Tab label="TENIS" value="2" />
                    <Tab label="BASQUET" value="3" />
                    <Tab label="PADEL" value="4" />
                    <Tab label="HOCKEY" value="5" />
                    <Tab label="SQUASH" value="6" />
                    <Tab label="VOLLEY" value="7" />
                  </Tabs>
                </Box>
                <TabPanel value="1">
                  <ColumnGroupingTable />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Item>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ListaReserva;
