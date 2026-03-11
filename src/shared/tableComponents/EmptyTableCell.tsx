import type { HubConnection } from "@microsoft/signalr";
import CustomSelect from "../components/CustomSelect";

interface EmptyPropsInterface{
    className?: string;
    cellType?: "work" | "date";
    presence?: "ABSENTVALID" | "ABSENTINVALID" | "PRESENT";
    studentId?: number;
    classId?: number;
    date?: string;
    changeMarkState?: (markState: string, studentId: number, workId: number, date: string, value: string, isOverdue: boolean) => void;
    changePresenceState?: (presenceState: string, studentId: number, classId: number, date: string) => void;
    connection?: HubConnection
    disabled?: boolean
}


export default function EmptyTableCell({cellType, className = "", changePresenceState, changeMarkState, studentId, classId, date, connection, presence, disabled = false}: EmptyPropsInterface){
    const selectDataMarks = ["2", "3", "4", "5", "+"]
    const selectDataVisit = ["Н", "У", "П"]

    // Проверка, работа или дата
    switch (cellType) {
        case "date":
            return (
                <td className={className}>
                    <CustomSelect disabled={disabled} presence={presence} connection={connection} studentId={studentId} classId={classId} date={date} changePresenceState={changePresenceState} selectData={selectDataVisit} />
                </td>
            )
        case "work":
            return (
                <td className={className}>
                    <CustomSelect disabled={disabled} connection={connection} studentId={studentId} classId={classId} date={date} changeMarkState={changeMarkState} selectData={selectDataMarks} />
                </td>
            )
        default:
            break;
    }
}
