import { useEffect, useState } from "react";
import Arrow from "./SVG/Arrow"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton } from '@headlessui/react'
import { useSearchParams } from "react-router-dom";
import type { DisciplineInterface, GroupInterface, ReportTypeInterface, StudentInterface } from "../types/fromRequests";

interface PropsInterface{
    textChildren?: string;
    helpText?: string;
    array: GroupInterface[] | DisciplineInterface[] | StudentInterface[] ;
    inputType: "group" | "discipline" | "student" | "type" | "startDate" | "endDate"
    onChange?: () => void;
    handleSearch: () => void;
}




export default function Input({textChildren="Группа", helpText="Название группы", array, inputType, handleSearch}: PropsInterface){
    const [selectedValue, setSelectedValue] = useState<GroupInterface | DisciplineInterface | StudentInterface | string | null>(null)
    const [query, setQuery] = useState(``)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // Поиск query параметров
        const disciplineId = searchParams.get("disciplineid")
        const groupId = searchParams.get("groupid")
        const studentId = searchParams.get("studentid")
        const reportType = searchParams.get("reporttype")

        // Установка выбранного параметра после перезапуска страницы
        let elementToSet: GroupInterface | DisciplineInterface | StudentInterface  | string | null = null;
        if(inputType == "type" && reportType){
            elementToSet = reportType
        } else {
            array.forEach(element => {
                if ((element.id == Number(groupId) && inputType == "group") || (element.id == Number(disciplineId) && inputType == "discipline") || (element.id == Number(studentId) && inputType == "student")) {
                    elementToSet = element
                }
            });
        }
        setSelectedValue(elementToSet)

        // Callback на проверку, есть ли оба элемента в query и вывод таблицы
        handleSearch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])
    const handleClick = () => {
       return filterValues
    }
    // Починить хуйню
    // Изменение выбранного элемента и добавление идентификатора в query параметры
    const handleChange = (e: GroupInterface | DisciplineInterface | StudentInterface | null) => {
        setSelectedValue(e)

        if (e){
            const params = new URLSearchParams()
            const groupId = searchParams.get("groupid")
            const disciplineId = searchParams.get("disciplineid")
            const studentId = searchParams.get("studentid")
            const reportType = searchParams.get("reporttype")
            switch(inputType){
                case "group" : {
                    params.append("groupid", String(e.id))
                    break
                }
                case "discipline" : {
                    params.append("disciplineid", String(e.id))
                    break
                }
                case "student" : {
                    params.append("studentid", String(e.id))
                    break
                }
                case "type" : {
                    params.append("reporttype", String(e.id))
                    break
                }
            }
            if(groupId) {
                params.append("groupid", groupId ? groupId : String(e.id))
            }
            if (disciplineId) {
                params.append("disciplineid", disciplineId ? disciplineId : String(e.id))
            }           
            if (studentId) {
                params.append("studentid", studentId ? studentId : String(e.id))
            }
            if(reportType){
                params.append("reporttype", reportType ? reportType : String(e.id))
            }
           
        }
    }

    // Фильтрует массив по алфавиту
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
                        className="w-58 bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-lg p-2.5 "
                        aria-label="Assignee"
                        displayValue={(val: GroupInterface | DisciplineInterface) => val?.name}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={helpText} />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <Arrow onClick={handleClick} className="h-6 w-6 absolute top-2.5 right-2.5"/>
                        </ComboboxButton>
                    <ComboboxOptions  anchor="bottom" className="w-65 bg-bgModal dark:bg-bgModalD text-tDark dark:text-tDarkD rounded-lg">
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