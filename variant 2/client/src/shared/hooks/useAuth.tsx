// src/shared/hooks/useAuth.tsx
import { useAppSelector } from "./useAppSelector";
import type { UserType } from "@/entities/user";

// Хук для проверки авторизации
export const useAuth = (): { user: UserType | null; isAuthenticated: boolean } => {
    const { user } = useAppSelector((store) => store.user);
    const isAuthenticated = !!user;
    return { user, isAuthenticated };
};