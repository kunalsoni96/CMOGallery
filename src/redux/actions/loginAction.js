import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../services/apiConfig';

export const loginUser = createAsyncThunk(
  'login/user',
  async ({ mobile, password }, thunkAPI) => {
    try {
      console.log(mobile, password)
      const response = await axios.post(`${baseUrl}client-login`, {
        mobile,
        password
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const googleLoggedIn = createAsyncThunk(
  'googleLoggedIn',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}google-login`, {
        name:data?.user.name,
        email:data?.user.email,
        photo:data?.user.photo,
      });

      console.log(response, 'last check')
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
