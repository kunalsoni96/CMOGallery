import { createSlice } from "@reduxjs/toolkit";
import { getDistricts, getEvents, getPhotos, searchImage } from "../actions/EventAction";

const eventSlice = createSlice({
    name:"event",
    initialState:{
        loading:false,
        error:null,
        eventsList:[],
        eventPhotos:[],
        districts:[],
        searchImages:[]
    },
    extraReducers:(builder)=>{
        //get events
        builder
        .addCase(getEvents.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEvents.fulfilled, (state, action)=> {
            state.loading = false;
            state.eventsList = action.payload.albums
            state.error = null;
        })
        .addCase(getEvents.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })


        //get photos
        builder
        .addCase(getPhotos.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPhotos.fulfilled, (state, action)=> {
            state.loading = false;
            state.eventPhotos = action.payload.photos
            state.error = null;
        })
        .addCase(getPhotos.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })


        //get districts
        builder
        .addCase(getDistricts.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getDistricts.fulfilled, (state, action)=> {
            state.loading = false;
            state.districts = action.payload
            state.error = null;
        })
        .addCase(getDistricts.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })

        //search images
        builder
        .addCase(searchImage.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchImage.fulfilled, (state, action)=> {
            state.loading = false;
            state.searchImages = action.payload
            state.error = null;
        })
        .addCase(searchImage.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })
    }
})

export default eventSlice.reducer