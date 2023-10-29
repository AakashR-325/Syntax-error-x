import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    address: '',
    provider: '',
    marketplace : {},
    factory : {},
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAdded(state, action) {
            state.address = action.payload.address
        },
        providerAdded(state, action) {
            state.provider = action.payload.provider
        },
        marketplaceAdded(state, action) {
            state.marketplace = action.payload.marketplace
        },
        factoryAdded(state, action) {
            state.factory = action.payload.factory
        },
    }
})
export const { userAdded, providerAdded, marketplaceAdded, factoryAdded } = userSlice.actions
export default userSlice.reducer