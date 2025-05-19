import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { TaskItem } from "@/entities/task/ui/TaskItem";
import { memo, useLayoutEffect } from "react";
import { Loader } from "@/shared/ui";
import styles from './style.module.css';

// Список задач
export function TaskList({ text, func, num }: { text: string, func: () => void, num: number }): React.JSX.Element {

    // Получаем состояние задач
    const { tasks, isLoading } = useAppSelector(state => state.task);

    useLayoutEffect(() => {
        func()
    }, [num, func]);

    // Возвращаем список задач
    return (
        <div className="mt-3">
            <h2>{text}</h2>
            {isLoading
                ? <Loader />
                : (
                    <ul className={`${styles.taskList} mt-3`}>
                        {tasks.length > 0 ? tasks.map((task) => (
                            <TaskItem key={task.id} task = {task}  />
                        )) : (
                            <li>No tasks</li>
                        )}
                    </ul>
                )}
        </div >
    );
}

// Мемоизированная версия списка задач
export const TaskListMemo = memo(TaskList);
