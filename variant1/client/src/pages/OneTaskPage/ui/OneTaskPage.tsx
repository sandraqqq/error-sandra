import { CurrentTaskItem } from "@/entities/task/ui/CurrentTaskItem";
import { useParams } from "react-router";

export function OneTaskPage(): React.JSX.Element {

    // Получаем id из url
    const { id } = useParams();

    // Если id не найден, то возвращаем сообщение
    if (!id) {
        return <div>Task not found</div>;
    }

    // Возвращаем страницу с задачей
    return (
        <div className="container mt-5">
            <CurrentTaskItem id={id} />
        </div>
    )
}