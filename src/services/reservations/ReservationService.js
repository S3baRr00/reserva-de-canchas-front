import http from "../../http-common";
import AuthHeader from "../auth-header";
import { Redirect } from "react-router";

const getAll = async (institution_id) => {
  try {
    const listadoCanchas = await http.get(
      `/institutions/${institution_id}/courts`
    );
    console.log("listadoCanchas");
    console.log(listadoCanchas);
    return listadoCanchas;
  } catch (err) {
    console.log(" error al obtener todas las canchas");
    console.log(err);
    return Promise.reject(err);
  }
};

const getAllByCustomerId = async (customer_id) => {
  try {
    return await http.get(`/reservations/customers/${customer_id}`);
  } catch (err) {
    console.log(err);
  }
};

const get = async (institution_id, court_id) => {
  try {
    return await http.get(`/institutions/${institution_id}/courts/${court_id}`);
  } catch (err) {
    console.log(err);
  }
};

const create = async (reservationData) => {
  console.log("crear reserva");
  console.log(reservationData);
  return await http
    .post(`/reservations`, reservationData)
    .then((response) => {
      console.log("reserva creada correctamente");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al crear la reserva");
      console.log(err.response);
      return Promise.reject(err.response);
      //return { message: "Por el momento forzamos la respuesta ok !" };
    });
};

const update = async (institution_id, data) => {
  try {
    return await http.patch(
      `/institutions/${institution_id}/courts/${data.id}`,
      data,
      {
        headers: AuthHeader(),
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const remove = async (institution_id, court_id) => {
  try {
    return await http.delete(
      `/institutions/${institution_id}/courts/${court_id}`,
      {
        headers: AuthHeader(),
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const removeAll = async (institution_id) => {
  try {
    return await http.delete(`/institutions/${institution_id}/courts`, {
      headers: AuthHeader(),
    });
  } catch (err) {
    console.log(err);
  }
};

const validateAvailableReservation = async (courtData) => {
  console.log("SERVICE PARA VALIDAR SI LA CANCHA AUN ESTA DISPONIBLE");
  console.log(courtData);
  return await http
    .post("/reservation/validation", {
      courtData,
    })
    .then((response) => {
      console.log("validacion de cancha realizada correctamente");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al validar si la cancha esta disponible");
      console.log(err.response);
      //return Promise.reject(err.response);
      return { message: "Por el momento forzamos la respuesta ok !" };
    });
};

const validateDepositShouldBeReturned = async (reservation_id) => {
  console.log("SERVICE PARA VALIDAR SI SE LE DEBE DEVOLVER LA SE??A AL CLIENTE");
  console.log(reservation_id);
  return await http
    .get(`/reservations/${reservation_id}/validate-deposit`)
    .then((response) => {
      console.log("validacion de cancha realizada correctamente");
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log("error al validar si la cancha esta disponible");
      console.log(err.response);
      return Promise.reject(err.response);
      //return { message: "Por el momento forzamos la respuesta ok !" };
    });
};

export default {
  getAll,
  get,
  getAllByCustomerId,
  create,
  update,
  remove,
  removeAll,
  validateAvailableReservation,
  validateDepositShouldBeReturned,
};
