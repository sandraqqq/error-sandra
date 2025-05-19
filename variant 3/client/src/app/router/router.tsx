import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage, NotFound, OneTaskPage, SignInPage, SignUpPage, TaskPage } from "@/pages";
import { Layout } from "../layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { GuardRouter, PublicRouter } from "@/shared/hocs";

// Роутер
export function Router(): React.JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={CLIENT_ROUTES.HOME} element={<Layout />} >
                    <Route path={CLIENT_ROUTES.HOME} element={<HomePage />} />

                    {/* Публичные маршруты */}
                    <Route element={<PublicRouter />}>
                        <Route path={CLIENT_ROUTES.SIGN_IN} element={<SignInPage />} />
                        <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
                    </Route>

                    {/* Приватные маршруты */}
                    <Route element={<GuardRouter />}>
                        <Route path={CLIENT_ROUTES.TASKS} element={<TaskPage />} />
                        <Route path={CLIENT_ROUTES.ONE_TASK} element={<OneTaskPage />} />
                    </Route>

                    <Route path={CLIENT_ROUTES.NOT_FOUND} element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}