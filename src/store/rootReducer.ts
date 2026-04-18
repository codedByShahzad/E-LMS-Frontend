import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import { authApi } from "../features/api/authApi"
import { courseApi } from "../features/api/courseApi"

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,

    [courseApi.reducerPath] : courseApi.reducer,
    
})

export default rootReducer