import axios from './request';

export const fetchLeftBar = function(params: any) {
  return axios.get(`/api/forward/getLeftBar`);
};
