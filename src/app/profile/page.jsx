"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Page() {
    const {user} = useAuth();

    return (
        <div>
            <h1>Профиль пользователя {user?.name}</h1>  
            <p>Здесь будет отображаться информация о пользователе и его настройки.</p>
        </div>
    );
}