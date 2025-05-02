import {createSlice} from '@reduxjs/toolkit';
import { googleLoggedIn, loginUser } from '../actions/loginAction';
const loginSlice = createSlice({
    name:'login',
    initialState:{
        user:{},
        token:null,
        loading:false,
        error:null,
        isloggedIn:false,
        signInWith:'',
        loginSuccess:false
    },
    reducers:{
        // googleLoggedIn:(state, action) => {
        //     state.token = action.payload.token;
        //     state.isloggedIn = true;
        //     state.loading = true;
        //     state.user = action.payload;
        //     state.signInWith = 'google';
        // },
        logoutUser:(state,action)=>{
            state.isloggedIn = false;
            state.loading = false;
        },
        mobileLoggedIn:(state, action) => {
            state.isloggedIn = true
        },
        loggedInSuccess:(state, action) => {
            state.loginSuccess = true
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
            state.user =  action.payload; 
            state.isloggedIn = true;
            state.signInWith = 'mobile'
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        });

        //google login
        builder
        .addCase(googleLoggedIn.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(googleLoggedIn.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isloggedIn = true;
            state.loading = true;
            state.user = action.payload;
            state.signInWith = 'google';
        })
        .addCase(googleLoggedIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        });

        
    }
})


export default loginSlice.reducer;
export const {logoutUser, loggedInSuccess}  = loginSlice.actions