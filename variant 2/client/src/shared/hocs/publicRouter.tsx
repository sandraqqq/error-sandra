import { Outlet, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { CLIENT_ROUTES } from "../enums/clientRoutes";
import { useAppSelector } from "../hooks/useAppSelector";

// Компонент для защиты публичных маршрутов
export const PublicRouter = (): React.JSX.Element => {
    const { isAuthenticated } = useAuth();
    const { isInitialized } = useAppSelector((store) => store.user);

    if (!isInitialized) {
        return <Outlet />;
    }

    return !isAuthenticated ? <Outlet /> : <Navigate to={CLIENT_ROUTES.HOME} />;
};