import { createAction } from "@reduxjs/toolkit"
export enum MessageType {
    SUCCESS,
    ERROR,
    INFO
}
export interface UpdateUserState {
    user?: any,
    message?: string,
    messageType: MessageType,
    loading: boolean,
}
export const updateSuccess = createAction<any>("update/success")
export const updateFail = createAction<string>('update/fail')
export const updateLoading = createAction("update/loading")
