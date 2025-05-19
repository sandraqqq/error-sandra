import { useNavigate } from "react-router";
import type { IRawTaskData, ITask } from "../model/types";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { deleteTaskThunk, updateTaskThunk } from "../api/taskThunkApi";
import { useState } from "react";
import { changeHandler } from "@/shared/utils";
import { Modal } from "@/shared/ui";

// Компонент для отображения текущей задачи
export function CurrentTaskItem({ id }: { id: string }): React.JSX.Element {
    // Получаем состояние задач
    const { tasks } = useAppSelector(state => state.task);

    // Находим задачу по id
    const currentTaskItem = tasks.find((task: ITask) => task.id === Number(id));

    // Состояние для хранения значений в полях формы
    const [inputs, setInputs] = useState<IRawTaskData>({
        title: currentTaskItem?.title || '',
        body: currentTaskItem?.body || ''
    });

    // Состояние для модального окна
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    // Функция для навигации
    const navigate = useNavigate();

    // Получаем диспатч
    const dispatch = useAppDispatch();

    // Если задача не найдена, то возвращаем сообщение
    if (!currentTaskItem) {
        return (
            <div className="text-center">
                <h1>Task not found</h1>
                <button type="button" className="btn btn-dark mt-5" onClick={() => navigate(-1)}>Go to back</button>
            </div>
        );
    }

    // Функция для редактирования задачи
    const editTaskHandler = (): void => {
        dispatch(updateTaskThunk({ id: currentTaskItem.id, title: inputs.title, body: inputs.body }));
    }

    // Функция для удаления задачи
    const deleteTaskHandler = (): void => {
        dispatch(deleteTaskThunk(currentTaskItem.id));
        navigate(-1);
    }

    // Возвращаем задачу
    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <label htmlFor="title" className="form-label mb-2">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="form-control mb-2"
                        value={inputs.title}
                        onChange={(event) => changeHandler(event, setInputs)}
                    />
                    <label htmlFor="body" className="form-label mb-2">Body</label>
                    <input
                        id="body"
                        name="body"
                        type="text"
                        className="form-control mb-2"
                        value={inputs.body}
                        onChange={(event) => changeHandler(event, setInputs)}
                    />
                    <button type="button" className="btn btn-primary me-2" onClick={editTaskHandler}>Edit Task</button>
                    <button type="button" className="btn btn-danger" onClick={() => setIsDeleteModalOpen(true)}>Delete Task</button>
                </div>
            </div>

            <button type="button" className="btn btn-dark mt-5" onClick={() => navigate(-1)}>Go to back</button>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={deleteTaskHandler}
                title="Delete Task"
                content="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    )
}