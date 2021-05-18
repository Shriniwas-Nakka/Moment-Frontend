import AxiosService from './axiosService';

const axios = new AxiosService();

export default class UserService {

    baseUrl = "http://localhost:5000/moment";

    createMoment = (data, token) => {
        return axios.postMethod(`${this.baseUrl}`, data, {
            headers: {
                'token': token
            }
        });
    }

    getMoment = (token) => {
        return axios.getMethod(`${this.baseUrl}`, {
            headers: {
                'token': token
            }
        });
    }

}