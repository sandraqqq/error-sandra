import { memo, useState } from "react";
import type { IRawTaskData } from "@/entities/task/model/types";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { createTaskThunk } from "@/entities/task";

// Форма для создания задачи
export function TaskForm(): React.JSX.Element {

    // Получаем диспатч задач
    const dispatch = useAppDispatch();

    // Состояние для хранения значений в полях формы
    const [inputs, setInputs] = useState<IRawTaskData>({
        title: '',
        body: ''
    });

    // Обработчик изменения значений в полях формы
    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        setInputs((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    // Обработчик отправки формы
    async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        try {
            event.preventDefault();
            dispatch(createTaskThunk(inputs));
        } catch (error) {
            console.log(error);
        }
    }

    // Возвращаем форму
    return (
        <div>
            <h2 className="mt-3">Create Task</h2>
            <form onSubmit={onSubmitHandler} className="mt-3">
                <div className="mb-3">
                    <input onChange={onChangeHandler} name="title" value={inputs.title} type="text" className="form-control" placeholder="Title" autoFocus />
                </div>
                <div className="mb-3">
                    <input onChange={onChangeHandler} name="body" value={inputs.body} type="text" className="form-control" placeholder="Body" />
                </div>
                <button type="submit" disabled={inputs.title === '' || inputs.body === ''} className="btn btn-success">Create Task</button>
            </form>
        </div>
    )
}

// Мемоизированная версия формы
export const TaskFormMemo = memo(TaskForm);

