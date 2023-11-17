/* eslint-disable no-useless-catch */
import axios from 'axios';
const BASE_URL = 'http://localhost:8090';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
export const httpApi = axios.create({
  baseURL: 'http://localhost:8090',
});

const send = async ({
  method = '',
  path = '',
  data = {},
  access_token = '',
} = {}) => {
  const url = BASE_URL + path;
  const headers = {
    'Access-Control-Allow-Origin': BASE_URL,
    'Access-Control-Allow-Credentials': true,
    'content-type': 'application/json;charset=UTF-8',
    'accept': 'application/json,',
    'Authrorization': access_token,
  };
  const options = {
    method,
    url,
    headers,
    data,
    withCredentials: true,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (e) {
    throw e;
  }
};
const getApi = ({ path = '', access_token = '' } = {}) => {
  return send({ mehtod: 'GET', path, access_token });
};
const putApi = ({ path = '', data = {}, access_token = '' } = {}) => {
  return send({ method: 'PUT', path, data, access_token });
};
const postApi = ({ path = '', data = {}, access_token = '' } = {}) => {
  return send({ method: 'POST', path, data, access_token });
};
const delApi = ({ path = '', data = {}, access_token = '' } = {}) => {
  return send({ method: 'DELETE', path, data, access_token });
};

export { getApi, putApi, postApi, delApi };
