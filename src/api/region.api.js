import { httpApi } from './axios';
export const getRegion = () => httpApi.get('/region');

export const saveRegion = (regionName) => {
  return httpApi.post('/region', regionName, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
