import AxiosService from './axiosService';

const axios = new AxiosService();

export default class UserService {

    baseUrl = "http://localhost:5000/user/"

    signUp = (data) => {
        return axios.postMethod(`${this.baseUrl}signup`, data);
    }

    signIn = (data) => {
        return axios.postMethod(`${this.baseUrl}signin`, data);
    }

}