
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,

}

export const loginUser = createAsyncThunk('auth/login',
    async(FormData) =>{
        const response = await axios.post('http://localhost:5000/api/auth/login', FormData,{
            withCredentials: true
        });
        console.log("response data", response.data)
        return response.data;
        
    }
)
export const logoutUser = createAsyncThunk('auth/logout',
    async() =>{
        const response = await axios.post('http://localhost:5000/api/auth/logout',{}, {
            withCredentials: true
        });
        console.log("response data", response.data)
        return response.data;
        
    }
)

export const registerUser = createAsyncThunk('auth/register', 
    async(FormData) =>{
        const response = await axios.post('http://localhost:5000/api/auth/register', FormData,{
            withCredentials: true
        }

        );
        return response.data;
    }
) 

export const checkAuth = createAsyncThunk('auth/check-auth',
    async() =>{
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.get('http://localhost:5000/api/auth/check-auth',
             {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate ', 
                Expires : '0'
            }
        });
        console.log("response data", response.data)
        return response.data;
        
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state, action) =>{

        },
    },
        extraReducers: (builder) =>{
            builder

            .addCase(loginUser.pending, (state)=>{
                state.isLoading = true;
            }).addCase(loginUser.fulfilled, (state, action)=>{
                console.log(action)
                console.log("I wanr action")
                state.isLoading = false;
                state.isAuthenticated = action.payload.success 
                state.user = action.payload.success ?  action.payload.user : null;
            }).addCase(loginUser.rejected, (state, action)=>{
                console.log("action rejected", action)
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;

            })
            .addCase(checkAuth.pending, (state)=>{
                state.isLoading = true;
            }).addCase(checkAuth.fulfilled, (state, action)=>{
                console.log("checkout fullfilled message", action.payload.user)
                
                state.isLoading = false;
                state.isAuthenticated = action.payload.success 
                state.user = action.payload.success ?  action.payload.user : null;
     
            }).addCase(checkAuth.rejected, (state, action)=>{
                console.log("action rejected", action)
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;

            })

            .addCase(registerUser.pending, (state)=>{
                state.isLoading = true;
            }).addCase(registerUser.fulfilled, (state, action)=>{
                console.log(action)
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            }).addCase(registerUser.rejected, (state, action)=>{
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;

            })
            .addCase(logoutUser.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;

            })
            

        }
   

})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;