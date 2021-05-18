import AxiosService from './axiosService';

const axios = new AxiosService();

export default class UserService {

    baseUrl = "http://localhost:5000/moment"

    getMoment = (token) => {
        return axios.getMethod(`${this.baseUrl}`, {
            headers: {
                'token': token
            }
        });
    }

}