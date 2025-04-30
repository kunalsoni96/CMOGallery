import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../services/apiConfig";

export const getEvents = createAsyncThunk(
    "events/get",
    async ({}, thunkAPI) => {
        try{
            const response = await axios(`${baseUrl}albums`,{
                headers: {
                    Accept: 'application/json',
                  }
            })
            
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetched failed');
        }
    }
)

export const getPhotos = createAsyncThunk(
    'photos/get',
    async(id, thunkAPI) => {
        try{
            const response = await axios(`${baseUrl}photos/${id}`,{
                headers: {
                    Accept: 'application/json',
                  }
            })
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetched failed');
        }
    }
)

export const getDistricts = createAsyncThunk(
    'districts',
    async({}, thunkAPI) => {
        try{
            const response = await axios(`${baseUrl}districts`,{
                headers: {
                    Accept: 'application/json',
                  }
            })
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetched failed');
        }
    }
)

export const searchImage = createAsyncThunk(
    'searchImage',
    async(image, thunkAPI) => {
        try{
            const response = await axios.post(`${baseUrl}search-by-upload`,{
                image:image,
            })

            console.log(response.data)
            return response.data
        }
        catch(error){
            console.log(error.response)
            return thunkAPI.rejectWithValue(error.response || 'Fetched failed');
        }
    }
)