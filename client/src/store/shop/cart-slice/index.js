import {  createAsyncThunk, createSlice }  from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    isLoading : false,
    cartItems : []
}
export const addToCart = createAsyncThunk(
    'cart/addCartItem',
    async ({userId, productId, quantity} ) =>{
        const response =  await axios.post('http://localhost:5000/api/auth/addcart/',{
            userId,productId, quantity
        } );
        
        return response?.data
    }
   
)
export const UpdateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({userId, productId, quantity} ) =>{
        const response =  await axios.put('http://localhost:5000/api/auth/cart/update',{
            userId,productId, quantity
        } );
        return response?.data
    }
   
)
export const DeleteCarttems = createAsyncThunk(
    'cart/DeleteCarttems',
    async ({userId, productId} ) =>{
        const response =  await axios.delete(`http://localhost:5000/api/auth/cart/${userId}/${productId}`);
        return response?.data
    }
)
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (userId) =>{
        const response =  await axios.get(`http://localhost:5000/api/auth/cart/get/${userId}`);
        return response?.data
    }
   
)

const shoppingCartSlice = createSlice({
    name:'shoppingCartSlice',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(addToCart.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled, (state,action) =>{
            console.log("action fullfilled payload", action.payload.data)
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(addToCart.rejected, (state,action) =>{
            state.isLoading = false,
            state.cartItems = []
        })
        //fetch case
        .addCase(fetchCartItems.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchCartItems.fulfilled, (state,action) =>{
            console.log("action fetchItems fullfilled payload", action.payload)
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(fetchCartItems.rejected, (state) =>{
            state.isLoading = false,
            state.cartItems = []
        })
        //delete case
        .addCase(DeleteCarttems.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(DeleteCarttems.fulfilled, (state,action) =>{
            console.log("action fullfilled payload", action.payload.data)
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(DeleteCarttems.rejected, (state) =>{
            state.isLoading = false,
            state.cartItems = []
        })
        // update case
        .addCase(UpdateCartItem.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(UpdateCartItem.fulfilled, (state,action) =>{
            console.log("action fullfilled payload", action.payload.data)
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(UpdateCartItem.rejected, (state) =>{
            state.isLoading = false,
            state.cartItems = []
        })
    }
});


export default  shoppingCartSlice.reducer;