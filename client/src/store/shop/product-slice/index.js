
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState ={
    isLoading: false,
    productList : [],
    productDetails: null
}


export const fetchFilteredProducts = createAsyncThunk(
    "/shop/fetchFilteredProducts",
    async ({filterParams, sortParams}) =>{
        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })
        const result = await axios.get(`http://localhost:5000/api/auth/getfiltered?${query}`, {
        })
        return result?.data

    }
)
export const fetchProductsDetailsById = createAsyncThunk(
    "/shop/fetchProductDetails",
    async (id) =>{
        
        const result = await axios.get(`http://localhost:5000/api/auth/get/${id}`, {
        })
        console.log(result)
        return result?.data

    }
)
const shoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails : (state, action) =>{
            state.productDetails = null
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchFilteredProducts.pending, (state, action) =>{
            state.isLoading = true
        } )
        .addCase(fetchFilteredProducts.fulfilled, (state, action) =>{
           // console.log("Action Payload" ,action.payload.data)
            state.isLoading = false
            state.productList = action.payload.data
        } )
        .addCase(fetchFilteredProducts.rejected, (state, action) =>{
            state.isLoading = false
            state.productList = []
        } )
        .addCase(fetchProductsDetailsById.pending, (state, action) =>{
            state.isLoading = true
        } )
        .addCase(fetchProductsDetailsById.fulfilled, (state, action) =>{
            //console.log("Action Payload" ,action.payload.data)
            state.isLoading = false
            state.productDetails = action.payload.data
        } )
        .addCase(fetchProductsDetailsById.rejected, (state, action) =>{
            state.isLoading = false
            state.productDetails = null
        } )

    }
});
export const {setProductDetails} = shoppingProductSlice.actions
export default shoppingProductSlice.reducer;


