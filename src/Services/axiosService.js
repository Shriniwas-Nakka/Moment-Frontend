import axios from 'axios';

export default class AxiosService {

    postMethod = (url, data, isHeaderRequierd = false) => {
        console.log('jhhahsd', url, data);
        return axios.post(url, data, isHeaderRequierd)
    }

    getMethod = (url, isHeaderRequierd = false) => {
        return axios.get(url, isHeaderRequierd)
    }

}
