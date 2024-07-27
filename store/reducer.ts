import { createReducer } from "@reduxjs/toolkit";
import { authorized, MessageType, unauthorized, updateFail, updateLoading, updateSuccess, UpdateUserState, verifyLoading } from "./actions";

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
        .addCase(authorized, (state, action) => {
            state.loading = false
            state.message = "Authorized"
            state.messageType = MessageType.SUCCESS
            state.user = action.payload
        })
        .addCase(unauthorized, (state, action) => {
            state.loading = false
            state.message = "Unauthorized"
            state.messageType = MessageType.ERROR
        })
        .addCase(verifyLoading, (state, action) => {
            state.loading = true
            state.message = "Loading"
            state.messageType = MessageType.INFO
        })
})
