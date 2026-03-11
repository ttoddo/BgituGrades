import { useSearchParams } from "react-router-dom"
import LeftNavBar from "../shared/components/LeftNavBar"
import { useEffect, useState } from "react"
import type {  DisciplineInterface, GroupInterface } from "../shared/types/fromRequests"
import { getDisciplines, getDisciplinesByGroup, getGroups } from "../shared/utils/apiRequests"
import { HubConnection } from "@microsoft/signalr"
import TableGeneratorSkeleton from "../shared/components/skeletons/TableGeneratorSkeleton"
import TopNavBarSkeleton from "../shared/components/skeletons/TopNavBarSkeleton"
import LeftNavBarSkeleton from "../shared/components/skeletons/LeftNavBarSkeleton"
import StudentTopNavBar from "../shared/components/StudentTopNavBar"
import ReportGenerator from "../shared/tableComponents/ReportGenerator"
import { setupSignalRReportsConnection } from "../shared/utils/signalRService"

export default function ReportActivity() {
    const [searchParams] = useSearchParams()
    //const [isEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [tableIds, setTableIds] = useState<number[]>([])
    const [groups, setGroups] = useState<GroupInterface[]>([])
    const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([])
    const [connection, setConnection] = useState<null | HubConnection>(null)
    //const [table, setTable] = useState<WorkTableSample>()
    //const [isTableReady, setIsTableReady] = useState(false)



    useEffect(() => {
        // Подключаем сигнал
        const establishConnection = async () => {
            const con = await setupSignalRReportsConnection(localStorage.getItem("api_key"))
            console.log(con.state)

            setConnection(con)
        }
        if(connection == null) {
            establishConnection()
        }
    }, [connection])


    useEffect(() => {
        const reloadDisciplines = async () => {
            const res: DisciplineInterface[] | undefined = await getDisciplinesByGroup(tableIds[0])
            if(res) {
                setDisciplines(res)
            }
        }

        // Все группы и дисциалины для полей ввода
        const getGroupsAndDisciplines = async () => {
            const respGroups: GroupInterface[] | undefined = await getGroups()
            const respDisciplines: DisciplineInterface[] | undefined = await getDisciplines()
            if(respGroups){
                setGroups(respGroups)
            }
            if(respDisciplines) {
                setDisciplines(respDisciplines)
            }
            setIsLoading(false)
        }

        // Проверка, есть ли в query параметрах и дисциплина и группа
        if(tableIds.length > 1){
            reloadDisciplines()
            connection?.invoke("GetMarkGrade", {
                disciplineId: tableIds[1],
                groupId: tableIds[0]
            })
        } else if (tableIds.length == 1){
            console.log(tableIds)
            reloadDisciplines()
        } else if (tableIds.length == 0) {
            getGroupsAndDisciplines()

        }

        // Проверка, есть ли ключ в query параметрах
        const key = searchParams.get("key")
        if(key) {
            localStorage.setItem("api_key", key)
        }

        getGroupsAndDisciplines()
    }, [connection, searchParams, tableIds])




    // Поиск таблицы, если оба query параметра заполены
    const handleSearch = () => {
        const groupid = searchParams.get("groupid")
        const disciplineid = searchParams.get("disciplineid")

        if((groupid != 'null' && disciplineid != 'null') && disciplineid && groupid){
            setTableIds([Number(groupid), Number(disciplineid)])
        } else if (groupid && groupid != 'null'){
            setTableIds([Number(groupid)])
        }

    }

    // Делаем слушатели событий из сигнала, если подключение активно
    // if (connection) {
    //     connection.on("ReceiveMarks", (data) => {
    //         setTable(data)
    //         setIsTableReady(true)

    //     })
    // }

    if(/*isTableReady &&*/ connection) {
        return (
            <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
                {
                    // Пришлось сделать так, чтобы не было блика при смене роута
                    isLoading ? 
                    <div className="w-[90%] animate-pulse flex flex-col gap-6.25">
                        <TopNavBarSkeleton />
                        <div className="flex gap-6.25">
                            <LeftNavBarSkeleton />
                            <TableGeneratorSkeleton/>
                        </div>
                    </div> :
                    <div className="w-[90%] flex flex-col gap-6.25">
                        <StudentTopNavBar handleSearch={handleSearch} groups={groups} disciplines={disciplines}/>
                        <div className="flex gap-6.25">
                            <LeftNavBar visitsStatus={false} tasksStatus={false} reportStatus={true} adminStatus={false}/>
                            <ReportGenerator />
                        </div>
                    </div>
                }   
            </div>
        )
    }
    return (
        <div className="w-full h-[90vh]  duration-75 bg-bgDark dark:bg-bgDarkD scroll-none flex justify-center ">
            <div className="w-[90%] animate-pulse flex flex-col gap-6.25">
                <TopNavBarSkeleton />
                <div className="flex gap-6.25">
                    <LeftNavBarSkeleton />
                    <TableGeneratorSkeleton/>
                </div>
            </div>
        </div>)
}

