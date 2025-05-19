import { Link } from "react-router";
import { type ITask } from "../model/types";

// Карточка задачи
export function TaskItem({ task }: { task: ITask }): React.JSX.Element {

    // Возвращаем карточку задачи
    return (
        <div className="card mt-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.body}</p>
                <Link to={`/tasks/${task.id}`} className="btn btn-primary">In task</Link>
            </div>
        </div>
    )
}