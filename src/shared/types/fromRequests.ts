
/**
 * Интерфейс получаемых из запроса групп
 */
export interface GroupInterface {
    id: number;
    name: string;
    studyStartDate: string;
    studyEndDate: string;
    startWeekNumber: string;
}

export interface DisciplineInterface {
    id: number;
    name: string;
}

export interface PresenceInterface {
    classId: number;
    classType: "PRACTICE" | "LECTURE";
    date: string;
    isPresent: "PRESENT" | "ABSENTVALID" | "ABSENTINVALID"
}

export interface WorkInterface {
    workId: number;
    name: string;
    value: null | string
}
 
export type DateTableSample = [
    {
        studentId: number;
        name: string;
        presences: PresenceInterface[] 
    }
]

export type WorkTableSample = [
    {
        studentId: number;
        name: string;
        marks: WorkInterface[] 
    }
]