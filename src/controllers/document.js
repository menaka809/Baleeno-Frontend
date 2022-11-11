import axios from 'axios';

import { baseURL } from '../config';

export const addDocument = async (newItem) => {
    const { data } = await axios.post(baseURL + '/document/add/', newItem);
    return data;
}

export const getAllDocuments = async (newItem) => {
    const { data } = await axios.get(baseURL + '/document/getAllDocuments');
    return data;
}

export const deleteDocument = async (newItem) => {
    const { data } = await axios.get(baseURL + '/document/delete/' + newItem);
    return data;
}

export const getSelectedDocument = async (id) => {
    const { data } = await axios.get(baseURL + '/document/getSelectedDocument/' + id);
    return data;
}

export const updateDocument = async (id, newItem) => {
    const { data } = await axios.post(baseURL + '/document/edit/' + id, newItem);
    return data;
}

export const downloadDocument = async (url) => {
    const { data } = await axios.get(baseURL + '/downloadDocument/edit' + url);
    return data;
}