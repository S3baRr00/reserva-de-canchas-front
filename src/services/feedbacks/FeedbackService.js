import http from "../../http-common";
import AuthHeader from "../auth-header";
import { Redirect } from "react-router";

const getAllByInstitution = async (institution_id) => {
  return await http
    .get(`/institutions/${institution_id}/feedback`)
    .then((feedbackList) => {
      console.log("feedbacks obtenidos");
      console.log(feedbackList);
      return feedbackList;
    })
    .catch((err) => {
      console.log("ERROR AL OBTENER FEEDBACKS");
      console.log(err.response);
      return Promise.reject(err.response);
      //return { message: "Por el momento forzamos la respuesta ok !" };
    });
};

const get = async (institution_id, court_id) => {
  try {
    return await http.get(`/institutions/${institution_id}/courts/${court_id}`);
  } catch (err) {
    console.log(err);
  }
};

const create = async (data) => {
  return await http
    .post(`/feedback`, data)
    .then((feedbackCreado) => {
      console.log("feedback creado");
      console.log(feedbackCreado);
      return feedbackCreado;
    })
    .catch((err) => {
      console.log("ERROR AL CREAR FEEDBACK");
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
      `/institutions/${institution_id}/promotions/${court_id}`,
      {
        headers: AuthHeader(),
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const removeAllByInstitution = async (institution_id) => {
  try {
    return await http.delete(`/institutions/${institution_id}/promotions`, {
      headers: AuthHeader(),
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  getAllByInstitution,
  get,
  create,
  update,
  remove,
  removeAllByInstitution,
};
