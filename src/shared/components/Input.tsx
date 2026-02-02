import { useEffect, useState } from "react";
import Arrow from "./SVG/Arrow"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton } from '@headlessui/react'
import { useSearchParams } from "react-router-dom";
import type { DisciplineInterface, GroupInterface } from "../types/fromRequests";

interface PropsInterface{
    textChildren?: string;
    helpText?: string;
    array: GroupInterface[] | DisciplineInterface[];
    inputType: "group" | "discipline"
    onChange?: () => void;
    handleSearch: () => void;
}




export default function Input({textChildren="Группа", helpText="Название группы", array, inputType, handleSearch}: PropsInterface){
    const [selectedValue, setSelectedValue] = useState<GroupInterface | DisciplineInterface | null>()
    const [query, setQuery] = useState(``)
    const [searchParams ,setSearchParams] = useSearchParams()
    useEffect(() => {
        handleSearch()
    }, [searchParams])
    const handleClick = () => {
       return filterValues
    }
    const handleChange = (e: GroupInterface | DisciplineInterface | null) => {
        setSelectedValue(e)
        if (e){
            if (inputType == "group") {
                let params = new URLSearchParams()
                let disciplineId = searchParams.get("disciplineid")
                let groupId = searchParams.get("groupid")
                params.append("groupid", groupId ? groupId : String(e.id))
                if (disciplineId) {
                    params.append("disciplineid", disciplineId ? disciplineId : String(e.id))
                }
                setSearchParams(params)
            } else if (inputType == "discipline") {
                let params = new URLSearchParams()
                let disciplineId = searchParams.get("disciplineid")
                let groupId = searchParams.get("groupid")
                params.append("disciplineid", disciplineId ? disciplineId : String(e.id))
                if (groupId) {
                    params.append("groupid", groupId ? groupId : String(e.id))
                }
                setSearchParams(params)
            }
        }
    }
    const filterValues = 
        query === ``
            ? array
            : array.filter((val) => {
                return val.name.toLowerCase().includes(query.toLowerCase())
            })

    return(
         <div className="flex flex-col gap-2.5">
            <p className="text-[28px] font-bold text-tLight dark:text-tLightD">{textChildren}</p>
            <div className="relative">
                <Combobox value={selectedValue}  onChange={handleChange} onClose={() => setQuery(``)}>
                    <ComboboxInput
                        className="w-62.5 bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-lg p-2.5 "
                        aria-label="Assignee"
                        displayValue={(val: GroupInterface | DisciplineInterface) => val?.name}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={helpText} />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <Arrow onClick={handleClick} className="h-6 w-6 absolute top-2.5 right-2.5"/>
                        </ComboboxButton>
                    <ComboboxOptions  anchor="bottom" className="w-62.5 bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-lg">
                        {filterValues.map((val) => (
                            <ComboboxOption key={val.id} id={String(val.id)}  value={val} className="bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD p-2.5">
                                {val.name}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>
        </div>
        
    )
}