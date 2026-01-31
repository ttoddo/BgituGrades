import { Select } from "@headlessui/react";
import { useState, type ChangeEvent } from "react";

interface PropsInterface{
    selectData: string[];
    backgroundColor?: string;
}



export default function CustomSelect({selectData = ["П", "Н", "У"]}: PropsInterface){

    const [selectedValue, setSelectedValue] = useState<string>("П")
    
    // Божественное откровение
    const [pIdor, setPIdor] = useState<boolean>(true)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value)
        setPIdor(e.target.value == "П")
    }
    
    return (
        <Select onChange={handleChange} value={selectedValue} className={`block w-full h-full appearance-none px-3 py-1.5 text-sm/6 
        focus:not-data-focus:outline-none text-tLight dark:text-tLightD 
        text-center ${pIdor ? "opacity-0" : "opacity-100"} 
        not-last:border-b-2 dark:not-last:border-b-tLightD not-last:border-b-tLight`}>
            {selectData.map((val) => (
                <option className="h-[25px] dark:bg-bgMiddleD text-center text-[15px] " value={val}>
                    <p className="text-center">{val}</p>
                </option>
            ))}
        </Select>
    )
}