import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '1ac2ef99020709401d47ffefec4a89cf',
        language: 'ko-KR'
    },
});

export default instance;