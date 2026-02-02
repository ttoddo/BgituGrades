import { Select } from "@headlessui/react";
import type { HubConnection } from "@microsoft/signalr";
import { useState, type ChangeEvent } from "react";

interface PropsInterface{
    selectData: string[];
    backgroundColor?: string;
    presence?: "ABSENT" | "PRESENT"
    classId: number;
    studentId: number;
    date: string;
    changePresenceState?: (presenceState: string, studentId: number, classId: number, date: string) => void;
    connection: HubConnection

}



export default function CustomSelect({selectData = ["П", "Н", "У"], presence, changePresenceState, studentId, classId, date, connection}: PropsInterface){ 
    const [selectedValue, setSelectedValue] = useState<string>(presence == "ABSENT" ? "Н" : "П")
    const [bg, setBg] = useState<string>()


    const handleUpdate = (data) => {
        //console.log(data.presences[0])
        if (Number(data.presences[0].classId) == classId && Number(data.studentId) == studentId && data.presences[0].date == date) {
            setSelectedValue(data.presences[0].isPresent == "ABSENT" ? "Н" : "П")
            setPIdor(data.presences[0].isPresent == "ABSENT" ? false : true)
        }
    }

    connection.on("UpdatedPresence", (data) => {handleUpdate(data)})


    // Божественное откровение
    const [pIdor, setPIdor] = useState<boolean>(presence == "ABSENT" ? false : true)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value)
        setPIdor(e.target.value == "П")
        if (changePresenceState){
            changePresenceState(e.target.value == "Н" ? "ABSENT" : "PRESENT", studentId, classId, date)
        }
        if(e.target.value == "Н"){
            setBg("bg-red")
        } else if(e.target.value == "У"){
            setBg("bg-orange")
        }

    }
    
    return (
        <Select onChange={handleChange} value={selectedValue} className={`block w-full h-full appearance-none
        focus:not-data-focus:outline-none text-tLight dark:text-tLightD bg-bgDark dark:bg-bgDarkD text-[15px]
        text-center ${pIdor ? "opacity-0 " : "opacity-100 " + bg} `}>
            {selectData.map((val) => (
                <option className="bg-bgDark dark:bg-bgDarkD">
                    {val}
                </option>
            ))}
        </Select>
    )
}