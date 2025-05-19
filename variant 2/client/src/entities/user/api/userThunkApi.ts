import { AxiosError } from 'axios';
import type { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import type { ISignInData, ISignUpData, UserWithTokenType } from '../model/types';
import { axiosInstance, setAccessToken } from '@/shared/lib/axiosInstance';
import { USER_THUNKS_TYPES } from '@/shared/enums/userThunkTypes';
import { AUTH_API_ROUTES } from '@/shared/enums/authApiRoutes';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Обновление токенов
export const refreshTokensThunk = createAsyncThunk<IApiResponseSuccess<UserWithTokenType>, void, { rejectValue: IApiResponseReject }>(USER_THUNKS_TYPES.REFRESH_TOKENS, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get<IApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.REFRESH_TOKENS);
        setAccessToken(data.data.accessToken);
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
});

// Регистрация
export const signUpThunk = createAsyncThunk<IApiResponseSuccess<UserWithTokenType>, ISignUpData, { rejectValue: IApiResponseReject }>(USER_THUNKS_TYPES.SIGN_UP, async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post<IApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.SIGN_UP, userData);
        setAccessToken(data.data.accessToken);
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
});

// Авторизация
export const signInThunk = createAsyncThunk<IApiResponseSuccess<UserWithTokenType>, ISignInData, { rejectValue: IApiResponseReject }>(USER_THUNKS_TYPES.SIGN_IN, async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post<IApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.SIGN_IN, userData);
        setAccessToken(data.data.accessToken);
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
});

// Выход
export const signOutThunk = createAsyncThunk<IApiResponseSuccess<null>, void, { rejectValue: IApiResponseReject }>(USER_THUNKS_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete<IApiResponseSuccess<null>>(AUTH_API_ROUTES.SIGN_OUT);
        setAccessToken('');
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
});