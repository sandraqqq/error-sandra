import { type ISignInData } from "@/entities/user";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/shared/hooks";
import { signInThunk } from "@/entities/user/api/userThunkApi";
import { changeHandler } from "@/shared/utils";

// Начальные значения для формы авторизации
const initialValues: ISignInData = {
    email: '',
    password: '',
}

export function SignInForm(): React.JSX.Element {

    // Хук для перенаправления  
    const navigate = useNavigate()

    // Хук для отправки действий
    const dispatch = useAppDispatch();

    // Хук для хранения значений в полях формы
    const [inputs, setInputs] = useState<ISignInData>(initialValues);

    // Обработчик отправки формы
    async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        try {
            event.preventDefault();
            // Отправляем данные на сервер
            dispatch(signInThunk(inputs));
            // Перенаправляем на главную страницу
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">

            <h2 className="mt-3">Sign In</h2>

            <form onSubmit={onSubmitHandler} className="mt-3 col-md-6 col-sm-12 mx-auto flex-center">
                <div className="mb-3">
                    <input onChange={(event) => changeHandler(event, setInputs)} name="email" value={inputs.email} type="email" className="form-control" placeholder="Email" autoFocus />
                </div>
                <div className="mb-3">
                    <input onChange={(event) => changeHandler(event, setInputs)} name="password" value={inputs.password} type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" disabled={inputs.email === '' || inputs.password === ''} className="btn btn-success">Sign In</button>
            </form>
        </div>
    )
}