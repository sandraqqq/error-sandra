import { refreshTokensThunk } from "@/entities/user/api/userThunkApi";
import { useAppDispatch } from "@/shared/hooks";
import { Header } from "@/widgets";
import { useEffect } from "react";
import { Outlet } from "react-router";

export function Layout(): React.JSX.Element {

  // Хук для отправки действий
  const dispatch = useAppDispatch();

  // Хук для обновления токенов
  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}