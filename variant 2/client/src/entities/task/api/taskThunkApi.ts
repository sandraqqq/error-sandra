import { createAsyncThunk } from "@reduxjs/toolkit";
import { TASK_THUNKS_TYPES } from "@/shared/enums/taskThunkTypes";
import type { IApiResponseSuccess, IApiResponseReject } from "@/shared/types";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { TASKS_API_ROUTES } from "@/shared/enums/tasksApiRoutes";
import type { ArrayTasksType, IRawTaskData, ITask } from "../model/types";
import type { AxiosError } from "axios";


// Получение всех задач
export const getTasksThunk = createAsyncThunk<IApiResponseSuccess<ArrayTasksType>, void, { rejectValue: IApiResponseReject }>(TASK_THUNKS_TYPES.GET_TASKS, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get<IApiResponseSuccess<ArrayTasksType>>(TASKS_API_ROUTES.TASKS);
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
})

// Создание задачи
export const createTaskThunk = createAsyncThunk<IApiResponseSuccess<ITask>, IRawTaskData, { rejectValue: IApiResponseReject }>(TASK_THUNKS_TYPES.CREATE_TASK, async (taskData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post<IApiResponseSuccess<ITask>>(TASKS_API_ROUTES.TASKS, taskData);
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
})

// Обновление задачи
export const updateTaskThunk = createAsyncThunk<IApiResponseSuccess<ITask>, ITask, { rejectValue: IApiResponseReject }>(TASK_THUNKS_TYPES.UPDATE_TASK, async (taskData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.put<IApiResponseSuccess<ITask>>(`${TASKS_API_ROUTES.TASKS}/${taskData.id}`, taskData);
        return data;
    } catch (error) {
        const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
    }
})

// Удаление задачи
export const deleteTaskThunk = createAsyncThunk<IApiResponseSuccess<ITask>, number, { rejectValue: IApiResponseReject }>(
    TASK_THUNKS_TYPES.DELETE_TASK,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.delete<IApiResponseSuccess<ITask>>(`${TASKS_API_ROUTES.TASKS}/${id}`);
            return data;
        } catch (error) {
            const err = error as AxiosError<IApiResponseReject>;
           return rejectWithValue(err.response!.data);
        }
    }
);
