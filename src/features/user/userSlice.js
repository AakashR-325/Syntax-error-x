import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    address : ''
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        userAdded(state, action) {
            state.address = action.payload.address
        }
    }
})
export const {userAdded} = userSlice.actions
export default userSlice.reducer