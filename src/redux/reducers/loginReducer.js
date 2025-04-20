import {createSlice} from '@reduxjs/toolkit';
import { loginUser } from '../actions/loginAction';
const loginSlice = createSlice({
    name:'login',
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false; 
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        });
    }
})
