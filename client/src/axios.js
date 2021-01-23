import axios from 'axios';

const instance = axios.create({
    //Production
    //baseURL: 'https://receptmingel.herokuapp.com/api/'

    //Local
    baseURL: 'http://localhost:8080/api/'
});

export default instance;