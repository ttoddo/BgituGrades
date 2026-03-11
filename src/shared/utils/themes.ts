


/**
 * Получение темы из локального хранилища
 * @returns Тема
 */
export const getTheme = (): string | null => localStorage.getItem(`THEME`)

/**
 * Установка темы в локальное хранилище
 * @param theme Тема
 */
export const setTheme = (theme: string): void => localStorage.setItem(`THEME`, theme)