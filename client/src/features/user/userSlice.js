import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state,action)=>{
            const {_id,name,email,password,bio} = action.payload
            state.user = {
                id:_id,
                name,
                email,
                password,
                bio
            }
        },
        logout: (state,action)=>{
            state.user = null
        }
    }
})

export const getCurrentUser = (state)=> state.user.user;
export const {setUser,logout} = userSlice.actions
export default userSlice.reducer