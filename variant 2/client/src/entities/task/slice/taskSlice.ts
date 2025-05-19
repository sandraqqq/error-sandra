import { createSlice } from "@reduxjs/toolkit";
import { getTasksThunk, createTaskThunk, updateTaskThunk, deleteTaskThunk } from "../api/taskThunkApi";
import type { ITask } from "../model/types";

type TaskState = {
    tasks: ITask[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    error: null,
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение всех задач
            .addCase(getTasksThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasksThunk.fulfilled, (state, action) => {
                state.tasks = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getTasksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'An error occurred';
            })

            // Создание задачи
            .addCase(createTaskThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.tasks.push(action.payload.data);
                state.isLoading = false;
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'An error occurred';
            })

            // Обновление задачи
            .addCase(updateTaskThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTaskThunk.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((task: ITask) => task.id === action.payload.data.id ? action.payload.data : task);
                state.isLoading = false;
            })
            .addCase(updateTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'An error occurred';
            })

            // Удаление задачи
            .addCase(deleteTaskThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task: ITask) => task.id !== action.payload.data.id);
                state.isLoading = false;
            })
            .addCase(deleteTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'An error occurred';
            })
    }
})

// Экспорт редьюсера    
export const taskReducer = taskSlice.reducer;