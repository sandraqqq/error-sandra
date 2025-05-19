import { signOutThunk } from "@/entities/user/api/userThunkApi";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { NavLink } from "react-router";

export function Header(): React.JSX.Element {

    // Хук для отправки действий
    const dispatch = useAppDispatch();
    // Хук для получения состояния пользователя
    const user = useAppSelector(store => store.user.user);

    const signOutHandler = (): void => {
        try {
            dispatch(signOutThunk());
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={CLIENT_ROUTES.HOME}>React App</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <NavLink className="nav-link" to={CLIENT_ROUTES.HOME}>Home</NavLink>
                        </li>

                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={CLIENT_ROUTES.TASKS}>Tasks</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button onClick={signOutHandler} className="nav-link">Sign Out</button>
                                    {/* <NavLink className="nav-link" to={'#'}>Sign Out</NavLink> */}
                                </li>
                            </>
                        )}

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={CLIENT_ROUTES.SIGN_IN}>Sign In</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={CLIENT_ROUTES.SIGN_UP}>Sign Up</NavLink>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}