import axios, {ResponseData} from './index';
import {AxiosPromise} from 'axios';

interface LoginReqArgsInterface {
  username: string;
  password: string;
}

export const loginReq = (data: LoginReqArgsInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/login',
    data,
    method: 'POST',
  });
};
