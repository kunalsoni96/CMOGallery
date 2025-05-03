import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../services/apiConfig';

export const loginUser = createAsyncThunk(
  'login/user',
  async ({ mobile, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}client-login`, {
        mobile,
        password
      });
      // console.log(response.data)
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

      data.userId = response.data.userId;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('login/logoutUser', async (_, thunkAPI) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return true;
});
