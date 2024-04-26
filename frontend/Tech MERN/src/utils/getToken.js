import { localStorageConfig } from '../config/localStorageConfig';

export const getToken = () => {
  return localStorage.getItem(localStorageConfig.TOKEN)
    ? localStorage.getItem(localStorageConfig.TOKEN)
    : null;
};
