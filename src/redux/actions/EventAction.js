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
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response || 'Fetched failed');
        }
    }
)

export const searchEvent = createAsyncThunk(
    'eventSearch', 
    async (search, thunkAPI) => {
        try{
            const response = await axios.get(`${baseUrl}search-results?q=${search}&_rsc=c5fq1`)
            console.log('-------------event search', response)
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response || 'Fetched failed');
        }
    }
)

export const searchEventByDistrict = createAsyncThunk(
    'searchEventByDistrict',
    async (district, thunkAPI) => {
        try{
        const response = await axios.get(`${baseUrl}albums-by-district?name=${district}&page=1&limit=16`)
        return response.data.albums
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response || 'Fetched failed');
        }
    }
    
)

export const getUserDownload = createAsyncThunk('getUserDownload', 
async(userId, thunkAPI)=> {
    try{
        const response = await axios.post(`${baseUrl}get-user-download-count`,{
            userId
        })
        console.log(response,'get download list')
        return response.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response || 'Fetched failed');
    }
})