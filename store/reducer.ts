import { createReducer } from "@reduxjs/toolkit";
import { MessageType, updateFail, updateLoading, updateSuccess, UpdateUserState } from "./actions";

export const initialState = { user: undefined, message: undefined, messageType: MessageType.INFO, loading: false } satisfies UpdateUserState as UpdateUserState
export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateSuccess, (state, action) => {
            state.user = action.payload
            state.message = "Successfully update user's data"
            state.messageType = MessageType.SUCCESS
            state.loading = false
        })
        .addCase(updateFail, (state, action) => {
            state.message = action.payload
            state.messageType = MessageType.ERROR
            state.loading = false
        })
        .addCase(updateLoading, (state, action) => {
            state.loading = true
            state.message = "Loading"
            state.messageType = MessageType.INFO
        })
})
