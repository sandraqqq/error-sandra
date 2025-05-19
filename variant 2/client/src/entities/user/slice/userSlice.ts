// src/entities/user/slice/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../model/types';
import { refreshTokensThunk, signUpThunk, signInThunk, signOutThunk } from '../api/userThunkApi';

// Тип состояния пользователя
type UserState = {
    user: UserType | null;
    error: string | null;
    loading?: boolean;
    isInitialized?: boolean;
};

// Начальное состояние пользователя
const initialState: UserState = {
    user: null,
    error: null,
    loading: false,
    isInitialized: false,
};

// Срез пользователя
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обновление токенов
            .addCase(refreshTokensThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(refreshTokensThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
                state.isInitialized = true;
            })
            .addCase(refreshTokensThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload?.error || 'An error occurred';
                state.isInitialized = true;
            })

            // Регистрация
            .addCase(signUpThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload?.error || 'An error occurred';
            })

            // Авторизация
            .addCase(signInThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload?.error || 'An error occurred';
            })

            // Выход
            .addCase(signOutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signOutThunk.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(signOutThunk.rejected, (state) => {
                state.loading = false;
                state.error = action.payload?.error || 'An error occurred';
            });
    },
});

// Редьюсер пользователя
export const userReducer = userSlice.reducer;