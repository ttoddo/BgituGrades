
/**
 * Интерфейс группы
 */
export interface GroupInterface {
    id: number;
    name: string;
    studyStartDate: string;
    studyEndDate: string;
    startWeekNumber: string;
}

/**
 * Ссылка для студента
 */
export interface StudentLinkInterface {
    link: string;
}

/**
 * Интерфейс дисциплины
 */
export interface DisciplineInterface {
    id: number;
    name: string;
}

/**
 * Интерфейс доступных типов посещения
 */
export interface PresenceInterface {
    classId: number;
    classType: "PRACTICE" | "LECTURE";
    date: string;
    isPresent: "PRESENT" | "ABSENTVALID" | "ABSENTINVALID"
}

/**
 * Интерфейс информации о работе
 */
export interface WorkInterface {
    workId: number;
    name: string;
    value: null | string
}
 
/**
 * Интерфейс таблицы посещений
 */
export type DateTableSample = [
    {
        studentId: number;
        name: string;
        presences: PresenceInterface[] 
    }
]

/**
 * Интерфейс таблицы работ
 */
export type WorkTableSample = [
    {
        studentId: number;
        name: string;
        marks: WorkInterface[] 
    }
]