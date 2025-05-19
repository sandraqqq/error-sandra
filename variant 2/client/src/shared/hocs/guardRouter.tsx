import { Outlet, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { CLIENT_ROUTES } from "../enums/clientRoutes";
import { useAppSelector } from "../hooks/useAppSelector";

// Компонент для защиты приватных маршрутов
export const GuardRouter = (): React.JSX.Element => {
    const { isAuthenticated } = useAuth();
    const { isInitialized } = useAppSelector((store) => store.user);

    // Если состояние еще не инициализировано, показываем текущий маршрут
    if (!isInitialized) {
        return <Outlet />;
    }

    // Если пользователь авторизован, показываем текущий маршрут, иначе перенаправляем на страницу авторизации
    return isAuthenticated ? <Outlet /> : <Navigate to={CLIENT_ROUTES.SIGN_IN} />;
};