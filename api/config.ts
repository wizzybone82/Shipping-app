import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = "https://hishamabbasi.com/api"

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

client.interceptors.request.use(
  async config => {
    const authToken = await AsyncStorage.getItem(
      'token',
    );
    if (authToken) {
      config.headers.set('Authorization', `Bearer ${authToken}`)
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export {
  client,
};
