import axios, {ResponseData} from './index';
import {AxiosPromise} from 'axios';

interface LoginReqArgsInterface {
  username: string;
  password: string;
}

interface GetInfoReqArgsInterface {
  userId: string;
}

export const loginReq = (data: LoginReqArgsInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/login',
    data,
    method: 'POST',
  });
};

export const getInfo = (data: GetInfoReqArgsInterface): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/getInfo',
    data,
    method: 'POST',
  });
};
