import type { HubConnection } from "@microsoft/signalr";
import CustomSelect from "../components/CustomSelect";

interface EmptyPropsInterface{
    className?: string;
    cellType: "work" | "date";
    presence: "ABSENT" | "PRESENT";
    studentId: number;
    classId: number;
    date: string;
    changePresenceState: (presenceState: string, studentId: number, classId: number, date: string) => void;
    connection: HubConnection
}


export default function EmptyTableCell({cellType, className = "", changePresenceState, studentId, classId, date, connection, presence}: EmptyPropsInterface){
    const selectDataMarks = ["2", "3", "4", "5", "+"]
    const selectDataVisit = ["Н", /*"У",*/ "П"]

    switch (cellType) {
        case "date":
            return (
                <td className={className}>
                    <CustomSelect presence={presence} connection={connection} studentId={studentId} classId={classId} date={date} changePresenceState={changePresenceState} selectData={selectDataVisit} />
                </td>
            )
        case "work":
            return (
                <td className={className}>
                    <CustomSelect connection={connection} studentId={studentId} classId={classId} date={date} selectData={selectDataMarks} />
                </td>
            )
        default:
            break;
    }
}