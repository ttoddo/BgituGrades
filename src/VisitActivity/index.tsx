import LeftNavBar from "../shared/components/LeftNavBar"
import TableGenerator from "../shared/tableComponents/TableGenerator"
import TopNavBar from "../shared/components/TopNavBar"
import { useEffect, useState } from "react"
import { getGroups, getDisciplines, getDisciplinesByGroup } from "../shared/utils/apiRequests"
import { useSearchParams } from "react-router-dom"
import type { DisciplineInterface, GroupInterface, TableSample } from "../shared/types/fromRequests"
import { HubConnectionBuilder } from "@microsoft/signalr"

function VisitActivity() {
    const [searchParams] = useSearchParams()
    const [isEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<GroupInterface[]>([])
    const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([])
    const [tableIds, setTableIds] = useState<number[]>([])
    const [table, setTable] = useState<TableSample>()
    const [isTableReady, setIsTableReady] = useState(false)
    const connection = new HubConnectionBuilder()
            .withUrl("https://maxim.pamagiti.site/hubs/grade?key=5521632f1a2017ee08b29ec8eb9fb2134f6509432020c20e371ce8f46c143493",
                 { withCredentials: false })
            .withAutomaticReconnect()
            .build()
        

    useEffect(() => {
        const getTable = async () => {
            //let res: TableSample | undefined = await getVisitsTable(tableIds[0], tableIds[1])
            await connection.start()
                .then(() => {
                    console.log("Подключились к сигналу")
                })
                .catch(err => console.log("Не подключились к сигналу:", err))
            await connection.invoke("GetPresenceGrade", {
                disciplineId: tableIds[1],
                groupId: tableIds[0]
            }).catch(err => {console.log(err)})
        }
        const reloadDisciplines = async () => {
            let res: DisciplineInterface[] | undefined = await getDisciplinesByGroup(tableIds[0])
            if (res) {
                setDisciplines(res)
            }
        }
        const getGroupsAndDisciplines = async () => {
            let respGroups: GroupInterface[] | undefined = await getGroups()
            let respDisciplines: DisciplineInterface[] | undefined = await getDisciplines()
            if (respGroups) {
                setGroups(respGroups)
            }
            if (respDisciplines) {
                setDisciplines(respDisciplines)
            }
            setIsLoading(false)
        }
        if (tableIds.length > 1) {
            getTable()
            reloadDisciplines()
        } else if (tableIds.length > 0) {
            reloadDisciplines()
        } else {
            getGroupsAndDisciplines()
        }
        let key = searchParams.get("key")
        if (key) {
            localStorage.setItem("api_key", key)
        }     
    }, [tableIds])

    connection.on("ReceivePresences", (data) => {
        console.log(data)
        setTable(data)
        setIsTableReady(true)
    })

    const handleSearch = () => {
        let groupid = searchParams.get("groupid")
        let disciplineid = searchParams.get("disciplineid")

        if ((groupid != 'null' && disciplineid != 'null') && disciplineid && groupid) {
            setTableIds([Number(groupid), Number(disciplineid)])
        } else if (groupid && groupid != 'null') {
            setTableIds([Number(groupid)])
        }
    }
    if (isLoading) {
        return (<div>Всё плохо</div>)
    }
    if (isTableReady) {
        return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups}/>
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator table={table} isEditMode={isEditMode} tableType="date" connection={connection}/>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="w-full h-[90vh] bg-bgDark dark:bg-bgDarkD scroll-none bg- flex justify-center ">
            <div className="w-[90%] flex flex-col gap-6.25">
                <TopNavBar handleSearch={handleSearch} disciplines={disciplines} groups={groups}/>
                <div className="flex gap-6.25">
                    <LeftNavBar visitsStatus={true} tasksStatus={false}/>
                    <TableGenerator isEditMode={isEditMode} tableType="date" connection={connection}/>
                </div>
            </div>
        </div> 
    )
}

export default VisitActivity