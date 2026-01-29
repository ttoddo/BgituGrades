import { useState } from "react";
import Arrow from "./SVG/Arrow"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton } from '@headlessui/react'


type Data = {
    id: number;
    name: string;
}

interface PropsInterface{
    textChildren?: string;
    helpText?: string;
    array: Data[];
}




export default function Input({textChildren="Группа", helpText="Название группы", array = [{id:1, name:"uyebishe"}]}: PropsInterface){
    const [selectedValue, setSelectedValue] = useState<Data | null>(null)
    const [query, setQuery] = useState(``)
    const handleClick = () => {
       return filterValues
    }
    const filterValues = 
        query === ``
            ? array
            : array.filter((val) => {
                return val.name.toLowerCase().includes(query.toLowerCase())
            })

    return(
         <div className="flex flex-col gap-[10px]">
            <p className="text-[28px] font-bold text-tLight dark:text-tLightD">{textChildren}</p>
            <div className="relative">
                <Combobox value={selectedValue}  onChange={setSelectedValue} onClose={() => setQuery(``)}>
                    <ComboboxInput
                        className="w-[250px] bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-[8px] p-[10px] "
                        aria-label="Assignee"
                        displayValue={(val) => val?.name}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={helpText} />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <Arrow onClick={handleClick} className="h-[24px] w-[24px] absolute top-[10px] right-[10px]"/>
                        </ComboboxButton>
                    <ComboboxOptions  anchor="bottom" className="w-[250px] bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-[8px]">
                        {filterValues.map((val) => (
                            <ComboboxOption key={val.id}   value={val} className="bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD p-[10px]">
                                {val.name}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>
        </div>
        
    )
}