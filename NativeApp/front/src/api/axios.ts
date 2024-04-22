import axios from 'axios';

import {Platform} from 'react-native';
// 서버를 배포하기 전까지 임시로 플랫폼별로 요청 주소를 다르게 해서 사용
const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030',

  withCredentials: true,
});

export default axiosInstance;
