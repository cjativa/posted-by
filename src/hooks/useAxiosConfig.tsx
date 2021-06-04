import Axios from 'axios';

export const AxiosConfig = Axios.create({
    baseURL: 'http://localhost:3000/api',
});
