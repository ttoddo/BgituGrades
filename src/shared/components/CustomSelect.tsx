import { Select } from "@headlessui/react";
import type { HubConnection } from "@microsoft/signalr";
import { useState, type ChangeEvent } from "react";
import type { PresenceInterface } from "../types/fromRequests";

interface PropsInterface {
    selectData: string[];
    backgroundColor?: string;
    presence?: "ABSENTVALID" | "ABSENTINVALID" | "PRESENT"
    classId?: number;
    studentId?: number;
    date?: string;
    changePresenceState?: (presenceState: string, studentId: number, classId: number, date: string) => void;
    connection?: HubConnection

}

interface DataInterface {
    studentId: number;
    name: null;
    presences: PresenceInterface[]
}

export default function CustomSelect({selectData = ["П", "Н", "У"], presence = "PRESENT", changePresenceState, studentId, classId, date, connection}: PropsInterface){ 
    const [selectedValue, setSelectedValue] = useState<string>(presence == "PRESENT" ? "П" : (presence == "ABSENTINVALID" ? "Н" : "У"))


    const handleUpdate = (data: DataInterface) => {
        console.log(data)
        if (Number(data.presences[0].classId) == classId && Number(data.studentId) == studentId && data.presences[0].date == date) {
            setSelectedValue(data.presences[0].isPresent == "PRESENT" ? "П" : data.presences[0].isPresent == "ABSENTINVALID" ? "Н" : "У")
            setPIdor(data.presences[0].isPresent == "PRESENT" ? true : false)
        }
    }

    const takeColor = (val: string): string => {
        switch (val) {
            case "Н":
                return "bg-red"
            case "У":
                return "bg-orange"
            default:
                return ""
        }
    }

    if (connection) {
        connection.on("UpdatedPresence", (data) => {handleUpdate(data)})
    }



    // Божественное откровение
    const [pIdor, setPIdor] = useState<boolean>(presence == "PRESENT" ? true : false)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value)
        setPIdor(e.target.value == "П")
        if (changePresenceState){
            let presenceToSet = ""
            switch (e.target.value) {
                case "Н":
                    presenceToSet = "ABSENTINVALID"
                    break;
                case "У":
                    presenceToSet = "ABSENTVALID"
                    break;
                case "П":
                    presenceToSet = "PRESENT"
                    break
                default:
                    break;
            }
            if (presenceToSet && studentId && classId && date) {
                changePresenceState(presenceToSet, studentId, classId, date)
            }
        }
    }
    
    return (
        <Select onChange={handleChange} value={selectedValue} className={`block w-full h-full appearance-none
        focus:not-data-focus:outline-none text-tLight dark:text-tLightD text-[15px]
        text-center ${(pIdor ? "opacity-0 " : "opacity-100 ") + takeColor(selectedValue)} `}>
            {selectData.map((val) => (
                <option className="bg-bgDark dark:bg-bgDarkD" key={val}>
                    {val}
                </option>
            ))}
        </Select>
    )
}