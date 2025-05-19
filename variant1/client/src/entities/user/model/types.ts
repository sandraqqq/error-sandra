// Тип данных для авторизации пользователя
export interface ISignInData {
    email: string;
    password: string;
}

// Тип данных для регистрации пользователя
export interface ISignUpData extends ISignInData {
    username: string;
}

// Тип данных для пользователя
export type UserType = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

// Тип данных для пользователя с токеном
export type UserWithTokenType = {
    user: UserType;
    accessToken: string;
}

