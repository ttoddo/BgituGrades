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
        <Select onChange={handleChange} value={selectedValue} className={`block w-full h-full appearance-none
        focus:not-data-focus:outline-none text-tLight dark:text-tLightD bg-bgDark dark:bg-bgDarkD text-[15px]
        text-center ${pIdor ? "opacity-0" : "opacity-100"} `}>
            {selectData.map((val) => (
                <option>
                    {val}
                </option>
            ))}
        </Select>
    )
}