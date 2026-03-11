import { createContext } from "react";



/**
 * Контекст для работы с темой
 */
export const ThemeContext = createContext("dark")

/**
 * Контекст для работы с аутентификацией(TODO)
 */
export const AuthContext = createContext(true);