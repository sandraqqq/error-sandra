import { useState } from "react";
import type { ISignUpData } from "@/entities/user/model/types";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/shared/hooks";
import { signUpThunk } from "@/entities/user/api/userThunkApi";
import { changeHandler } from "@/shared/utils";

// Тип данных для формы регистрации (используем тип из модели)
interface ISignUpFormProps extends ISignUpData {
    confirmPassword: string;
}

// Начальные значения для формы регистрации
const initialValues: ISignUpFormProps = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

// Форма регистрации
export function SignUpForm(): React.JSX.Element {

    // Хук для отправки действий
    const dispatch = useAppDispatch();

    // Хук для перенаправления  
    const navigate = useNavigate();

    // Хук для хранения значений в полях формы
    const [inputs, setInputs] = useState<ISignUpFormProps>(initialValues);

    // Обработчик отправки формы
    async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        try {
            // Прерываем отправку формы
            event.preventDefault();

            // Отправляем данные на сервер
            dispatch(signUpThunk(inputs));

            // Перенаправляем на главную страницу
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // Обработчик отправки формы
    return (
        <div className="container">
            <h2 className="mt-3">Sign Up</h2>

            <form className="mt-3 col-md-6 col-sm-12 mx-auto flex-center" onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    <input autoFocus className="form-control" onChange={(event) => changeHandler(event, setInputs)} value={inputs.username} name="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-3">
                    <input className="form-control" onChange={(event) => changeHandler(event, setInputs)} value={inputs.email} name="email" type="email" placeholder="Email" />
                </div>
                <div className="mb-3">
                    <input className="form-control" onChange={(event) => changeHandler(event, setInputs)} value={inputs.password} name="password" type="password" placeholder="Password" />
                </div>
                <div className="mb-3">
                    <input className="form-control" onChange={(event) => changeHandler(event, setInputs)} value={inputs.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm Password" />
                </div>

                <button type="submit" disabled={inputs.username === '' || inputs.email === '' || inputs.password === '' || inputs.confirmPassword === ''} className="btn btn-success">Sign Up</button>
            </form>
        </div>
    )
}