import {createSlice} from '@reduxjs/toolkit';
import { loginUser } from '../actions/loginAction';
import * as Keychain from 'react-native-keychain';
const loginSlice = createSlice({
    name:'login',
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null,
        isloggedIn:false
    },
    reducers:{
        googleLoggedIn:(state, action) => {
            state.token = action.payload.token;
            state.isloggedIn = !state.isloggedIn
        },
        logoutUser:(state,action)=>{
            state.isloggedIn = action.payload.logout
        },
        mobileLoggedIn:(state, action) => {
            state.isloggedIn = true
        }
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
            state.isloggedIn = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        });
    }
})


export default loginSlice.reducer;
export const {logoutUser}  = loginSlice.actions