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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
