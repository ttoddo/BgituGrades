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
        <Select onChange={handleChange} value={selectedValue} className={`block w-full h-full appearance-none border-none px-3 py-1.5 text-sm/6 
        focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 text-tLight dark:text-tLightD 
        data-focus:outline-white/25 text-center ${pIdor ? "opacity-0" : "opacity-100"} `}>
            {selectData.map((val) => (
                 <option value={val}>{val}</option>
            ))}
        </Select>
    )
}