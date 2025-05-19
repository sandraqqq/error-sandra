import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { TaskFormMemo } from "@/widgets/TaskForm/ui/TaskForm";
import { TaskListMemo } from "@/widgets/TaskList/ui/TaskList";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { getTasksThunk } from "@/entities/task";
import styles from './style.module.css';

// Страница задач
export function TaskPage(): React.JSX.Element {
    // Получаем диспатч
    const dispatch = useAppDispatch();

    // Состояние для хранения цвета
    const [color, setColor] = useState<string>('#000000');

    // Генерируем случайный цвет
    const generateColor = (): void => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setColor(randomColor);
    }

    // Устанавливаем заголовок страницы
    useLayoutEffect(() => {
        document.title = "React App: Task Page";
    }, []);

    // Получаем задачи
    useEffect(() => {
        dispatch(getTasksThunk());
    }, [])

    // Функция для вызова при клике
    const myFunc = (): void => {
        console.log('click');
    }

    // Мемоизируем функцию
    const myFuncMemo = useCallback(myFunc, []);

    // "Тяжелая" функция
    const hardFunc = (a: number, b: number): number => {
        return a + b;
    }

    // Мемоизируем значение "тяжелой" функции
    const hardResultMemo = useMemo(() => hardFunc(1, 2), []);

    // Добавляем задач
    return (
        <div className="container">
            <h1 className={`${styles.header} mt-3`} onClick={generateColor} style={{ color }}>Task Page</h1>
            <TaskFormMemo />
            <TaskListMemo text={'Task List'} func={myFuncMemo} num={hardResultMemo} />
        </div>
    )
}