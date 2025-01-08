import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { BASE_URL, STATUS_CODE_MAPPING, TIMEOUT } from '../model/consts';
import { getToken } from './token';

const shouldDisplayError = (response: AxiosResponse) =>
  STATUS_CODE_MAPPING[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error?.response && shouldDisplayError(error.response)) {
        // eslint-disable-next-line no-console
        console.error(error.response?.data);
      }
      return error.response;
    },
  );

  return api;
};
