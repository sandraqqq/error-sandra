// Тип данных для задачи (когда создаем задачу)
export interface IRawTaskData {
    title: string;
    body: string;
}

// Тип данных для задачи с id, authorId, createdAt, updatedAt
export interface ITask extends IRawTaskData {
    id: number;
    authorId?: number;
    createdAt?: string;
    updatedAt?: string;
}

// Тип данных для массива задач
export type ArrayTasksType = ITask[];
