



export const getTheme = (): string | null => localStorage.getItem(`THEME`)

export const setTheme = (theme: string): void => localStorage.setItem(`THEME`, theme)