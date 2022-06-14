import React from 'react';
import http from '../../http-common'

const getAll = () => {
    return http.get(`/institutions`);
};

const get = async (institution_id) => {
    return await http.get(`/institutions/${institution_id}`)
        .then((response) => response.data)
        .catch((err) => Promise.reject(err));;
};

const getInstitutionSchedules = async (institution_id) => {
    return await http.get(`/institutions/${institution_id}/schedule`)
        .then((response) => response)
        .catch((err) => Promise.reject(err));
};

const createInstitutionSchedules = async (institution_id, data) => {
    return await http.post(`/institutions/${institution_id}/schedule`, data)
        .then((response) => response)
        .catch((err) => Promise.reject(err));
};

const create = data => {
    return http.post(`/institutions`, data);
};

const update = (institution_id, data) => {
    return http.put(`/institutions/${institution_id}`, data);
};

const remove = institution_id => {
    return http.delete(`/institutions/${institution_id}`);
};

const removeAll = () => {
    return http.delete(`/institutions`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    getInstitutionSchedules,
    createInstitutionSchedules,
};
